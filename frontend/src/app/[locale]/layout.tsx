import LocalizationProvider from '@components/localization-provider/localization-provider';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import initLocalization from '../i18n';
import { LocaleLayout } from '@layouts/locale/locale-layout.component';

export interface LocalizationLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const namespaces = ['common', 'paths', 'login', 'scenario'];

const LocalizationLayout = async (props: LocalizationLayoutProps) => {
  const { params, children } = props;
  const { locale } = await params;
  const { resources } = await initLocalization(locale, namespaces);

  return (
    <LocalizationProvider {...{ locale, resources, namespaces }}>
      <LocaleLayout>{children}</LocaleLayout>
    </LocalizationProvider>
  );
};

export const generateMetadata = async ({ params }: LocalizationLayoutProps) => {
  const { locale } = await params;
  const { t } = await initLocalization(locale, namespaces);
  const path = (await headers()).get('x-path');
  const normalizedPath = path?.replace(/^\/sv(?=\/|$)/, '') ?? null;
  const metadataPath =
    normalizedPath && /^\/\d+(?:\/\d+)?$/.test(normalizedPath) ?
      '/start'
    : path;

  const pathName =
    metadataPath ?
      metadataPath
        .replace(/^\/?/, '')
        .split('/')
        .map((s) =>
          `${s.substring(0, 1).toUpperCase()}${s.substring(1)}`.replace(
            '-',
            ' '
          )
        )
        .join(', ')
    : null;

  const getTitle = () => {
    if (metadataPath) {
      return `${t('common:app_name')} - ${t(`paths:${metadataPath}.title`, { defaultValue: pathName })}`;
    }
    return t('common:app_name');
  };

  const description =
    metadataPath ?
      t(`paths:${metadataPath}.description`, { defaultValue: '' })
    : '';

  return {
    title: getTitle(),
    description,
  };
};

export default LocalizationLayout;
