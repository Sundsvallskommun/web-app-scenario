'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';
import { SettingsMenu } from '@components/settings-menu/settings-menu.component';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { useRouter } from 'next/navigation';

export default function Start() {
  const [opacity, setOpacity] = useState<number>(0);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const transitionDuration = 1000;
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setShowBackground(true);
    setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);
  }, []);

  const handleNext = () => {
    setOpacity(0);
    setTimeout(() => {
      setShowBackground(false);
      setTimeout(() => {
        //NOTE: Push to the selected Scenario id
        router.push('/1');
      }, transitionDuration);
    }, transitionDuration);
  };

  return (
    <DefaultLayout
      transitionDuration={transitionDuration}
      showBackground={showBackground}
    >
      <SettingsMenu />
      <div
        className="flex flex-col gap-24 text-center justify-center items-center transition-opacity"
        style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
      >
        <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg m-0">
          {t('common:app_name')}
        </h1>
        <Button size="lg" rounded onClick={handleNext}>
          {t('common:start')}
        </Button>
      </div>
    </DefaultLayout>
  );
}
