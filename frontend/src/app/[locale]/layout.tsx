import LocalizationProvider from '@components/localization-provider/localization-provider';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import initLocalization from '../i18n';

export interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const namespaces = ['common', 'paths', 'intro', 'login'];

const LocaleLayout = async (props: LocaleLayoutProps) => {
  const { params, children } = props;
  const { locale } = await params;
  const { resources } = await initLocalization(locale, namespaces);

  return <LocalizationProvider {...{ locale, resources, namespaces }}>{children}</LocalizationProvider>;
};

export const generateMetadata = async ({ params }: LocaleLayoutProps) => {
  const { locale } = await params;
  const { t } = await initLocalization(locale, namespaces);
  const path = (await headers()).get('x-path');

  const pathName =
    !path ? null : (
      path
        .replace(/^\/?/, '') // Remove leading slash
        .split('/') // Split into sections
        .map(
          (s) =>
            `${s.substring(0, 1).toUpperCase()}${s.substring(1)}` // Capitalize the first letter
              .replace('-', ' ') // Replace separators
        )
        .join(', ')
    ); // Comma separate sections

  const title =
    path ? `${t('common:app_name')} - ${t(`paths:${path}.title`, { defaultValue: pathName })}` : t('common:app_name');
  const description = t(`paths:${path}.description`, { defaultValue: '' });

  return {
    title,
    description,
  };
};

export default LocaleLayout;
