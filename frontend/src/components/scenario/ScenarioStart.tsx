'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@sk-web-gui/react';
import { PauseControl } from '@components/pause-control/pause-control.component';
import { useEffect, useState } from 'react';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';

interface ScenarioStartProps extends WizardPageProps {
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}

export const ScenarioStart: React.FC<ScenarioStartProps> = ({ onNext, onRestart, transitionDuration = 1000 }) => {
  const [opacity, setOpacity] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className="flex flex-col gap-24 text-center justify-center items-center transition-opacity"
      style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
    >
      <PauseControl onQuit={() => onRestart?.()} />
      <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg">{t('common:scenario_name')}</h1>
      <Button size="lg" rounded onClick={onNext}>
        {t('common:start_alt')}
      </Button>
    </div>
  );
};
