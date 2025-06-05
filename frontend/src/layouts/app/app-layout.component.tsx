'use client';

import { ReactNode, useEffect, useState } from 'react';
import 'dayjs/locale/sv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dotenv';
import updateLocale from 'dayjs/plugin/updateLocale';
import { GuiProvider } from '@sk-web-gui/react';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@services/user-service/user-service';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { setAssistantStoreName, useAssistantStore } from '@sk-web-gui/ai';
import { useTranslation } from 'react-i18next';

dayjs.extend(utc);
dayjs.locale('sv');
dayjs.extend(updateLocale);
dayjs.updateLocale('sv', {
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
});

interface ClientApplicationProps {
  children: ReactNode;
}

const AppLayout = ({ children }: ClientApplicationProps) => {
  const colorScheme = useLocalStorage(useShallow((state) => state.colorScheme));
  const getMe = useUserStore((state) => state.getMe);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [apiBaseUrl, setApiBaseUrl, setApiKey, setSettings, setInfo, setStream] = useAssistantStore(
    useShallow((state) => [
      state.apiBaseUrl,
      state.setApiBaseUrl,
      state.setApikey,
      state.setSettings,
      state.setInfo,
      state.setStream,
    ])
  );

  useEffect(() => {
    if (!apiBaseUrl) {
      setApiBaseUrl(process.env.NEXT_PUBLIC_INTRIC_API_URL ?? '');
    }
  }, [apiBaseUrl, setApiBaseUrl]);

  useEffect(() => {
    setStream(true);
    setApiKey(process.env.NEXT_PUBLIC_ASSISTANT_APIKEY ?? '');
    setSettings({
      app: process.env.NEXT_PUBLIC_ASSISTANT_APP || undefined,
      hash: process.env.NEXT_PUBLIC_ASSISTANT_HASH || undefined,
      assistantId: process.env.NEXT_PUBLIC_ASSISTANT_ID ?? '',
    });
    setInfo({
      name: t('common:assistant_name'),
      id: process.env.NEXT_PUBLIC_ASSISTANT_ID ?? '',
    });
    setAssistantStoreName(`sk-assistant-${process.env.NEXT_PUBLIC_APP_NAME}`);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMe();
    setMounted(true);
  }, [getMe, setMounted]);

  if (!mounted || !apiBaseUrl) {
    return <LoaderFullScreen />;
  }

  return <GuiProvider colorScheme={colorScheme}>{children}</GuiProvider>;
};

export default AppLayout;
