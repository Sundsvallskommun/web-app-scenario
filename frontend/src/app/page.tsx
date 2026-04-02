'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { isRunningStandalone } from '@utils/pwa-mode';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
  const webMode = useSessionStorage((state) => state.webMode);
  const router = useRouter();

  useEffect(() => {
    if (!webMode && !isRunningStandalone()) {
      router.push('/pwainstaller');
    } else {
      router.push('/start');
    }
  }, [router, webMode]);

  return <LoaderFullScreen />;
};

export default Index;
