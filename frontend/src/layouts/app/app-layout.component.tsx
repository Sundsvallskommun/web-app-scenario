'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useCategoryStore } from '@services/category-service/category.service';
import { useUserStore } from '@services/user-service/user-service';
import { setAssistantStoreName, useAssistantStore } from '@sk-web-gui/ai';
import { GuiProvider } from '@sk-web-gui/react';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { normalizeRoutePath } from '@utils/protected-routes';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import 'dotenv';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

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
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ],
});

interface ClientApplicationProps {
  children: ReactNode;
}

const AppLayout = ({ children }: ClientApplicationProps) => {
  const colorScheme = useLocalStorage(useShallow((state) => state.colorScheme));
  const router = useRouter();
  const path = usePathname();
  const normalizedPath = normalizeRoutePath(path || '/');
  const getMe = useUserStore(useShallow((state) => state.getMe));
  const getCategories = useCategoryStore(useShallow((state) => state.getCategories));

  const [mounted, setMounted] = useState(false);
  const [apiBaseUrl, setApiBaseUrl, setStream] = useAssistantStore(
    useShallow((state) => [
      state.apiBaseUrl,
      state.setApiBaseUrl,
      state.setStream,
    ])
  );

  useEffect(() => {
    if (!apiBaseUrl) {
      setApiBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? '');
    }
  }, [apiBaseUrl, setApiBaseUrl]);

  useEffect(() => {
    const stream = process.env.NEXT_PUBLIC_STREAM === 'false' ? false : true;
    setStream(
      typeof process.env.NEXT_PUBLIC_STREAM === 'boolean' ?
        process.env.NEXT_PUBLIC_STREAM
      : stream
    );

    setAssistantStoreName(`sk-assistant-${process.env.NEXT_PUBLIC_APP_NAME}`);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (normalizedPath !== '/logout' && normalizedPath !== '/login') {
      getMe()
        .then((res) => {
          if (!res.data?.name || !res.data?.username) {
            router.push(`/login?path=${path}`);
            return;
          }

          return getCategories().catch(() => undefined);
        })
        .catch((err) => {
          router.push(`/login?failMessage=${err?.props?.message}&path=${path}`);
        });
    }
  }, [getCategories, getMe, normalizedPath, path, router]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted || !apiBaseUrl) {
    return <LoaderFullScreen />;
  }

  return <GuiProvider colorScheme={colorScheme}>{children}</GuiProvider>;
};

export default AppLayout;
