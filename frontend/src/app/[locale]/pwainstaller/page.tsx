'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { InstallPromptEvent } from '@interfaces/install-prompt-event.type';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Button, Icon } from '@sk-web-gui/react';
import { isRunningStandalone } from '@utils/pwa-mode';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { MonitorDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PwaInstaller() {
  const [opacity, setOpacity] = useState<number>(1);
  const [ready, setReady] = useState<boolean>(false);
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const { t } = useTranslation();
  const installRef = useRef<InstallPromptEvent>(null);
  const setWebMode = useSessionStorage((state) => state.setWebMode);
  const router = useRouter();
  const transitionDuration = 1000;

  useEffect(() => {
    if (isRunningStandalone()) {
      router.replace('/start');
      return;
    }

    const handleInstallPrompt = (event: InstallPromptEvent) => {
      event.preventDefault();
      installRef.current = event;
      setCanInstall(true);
      setReady(true);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    const fallbackTimeout = window.setTimeout(() => {
      setReady(true);
    }, 1200);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.clearTimeout(fallbackTimeout);
    };
  }, [router]);

  const handleContinue = () => {
    setOpacity(0);
    setWebMode(true);
    setTimeout(() => {
      router.push('/start');
    }, transitionDuration);
  };

  useEffect(() => {
    if (!ready || canInstall || installRef.current) {
      return;
    }

    const continueTimeout = window.setTimeout(() => {
      handleContinue();
    }, 200);

    return () => {
      window.clearTimeout(continueTimeout);
    };
    //eslint-disable-next-line
  }, [ready, canInstall]);

  const handleInstall = () => {
    installRef?.current?.prompt?.();
  };

  return (
    <DefaultLayout transitionDuration={transitionDuration}>
      {!ready ?
        <LoaderFullScreen />
      : <div
          className="flex flex-col justify-between h-full items-center grow"
          style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
        >
          <div className="flex grow flex-col gap-24 text-center justify-center items-center transition-opacity">
            <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg m-0">
              {t('common:app_name')}
            </h1>
            <p className="text-display-3-sm md:text-display-3-md xl:text-display-3-lg mb-24">
              {t('common:pwa_installation')}
            </p>
            <Button
              size="lg"
              rounded
              leftIcon={<Icon icon={<MonitorDown />} />}
              onClick={handleInstall}
              disabled={!canInstall}
            >
              {t('common:install')}
            </Button>
          </div>
          <p className="pb-36">
            <Button variant="link" onClick={handleContinue}>
              {t('common:continue_on_web')}
            </Button>
          </p>
        </div>
      }
    </DefaultLayout>
  );
}
