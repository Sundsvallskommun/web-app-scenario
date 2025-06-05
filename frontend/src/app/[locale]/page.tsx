'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

const Index = () => {
  const [webMode, pwa] = useSessionStorage((state) => [state.webMode, state.pwa], shallow);

  const router = useRouter();

  const showInstaller = !webMode && !pwa;

  useEffect(() => {
    if (showInstaller) {
      router.push('/pwainstaller');
    } else {
      router.push('/start');
    }
  }, [router, showInstaller]);

  return <LoaderFullScreen />;
};

export default Index;
