'use client';

import { Button, ColorSchemeMode, FormControl, FormLabel, Icon, Modal, Switch } from '@sk-web-gui/react';
import { Glasses } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IntroductionModal } from './introduction-modal.component';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { useShallow } from 'zustand/shallow';

interface PauseModalProps {
  open: boolean;
  onClose: () => void;
  onQuit: () => void;
  isPlaying?: boolean;
}

export const PauseModal: React.FC<PauseModalProps> = ({ open, onClose, onQuit, isPlaying }) => {
  const { t } = useTranslation();
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [highcontrast, setHighcontrast, colorScheme, setColorScheme] = useLocalStorage(
    useShallow((state) => [state.highcontrast, state.setHighContrast, state.colorScheme, state.setColorScheme])
  );

  return (
    <>
      <IntroductionModal open={showIntroduction} onClose={() => setShowIntroduction(false)} />
      <Modal show={open} onClose={onClose} label={t('common:scenario_paused')} labelAs="h1" className="w-[48rem]">
        <Modal.Content>
          <h2>{t('common:app_name')}</h2>
          <span className="flex justify-between items-center w-full">
            <p>{t('common:scenario_name')}</p>
            <Button
              variant="tertiary"
              size="sm"
              leftIcon={<Icon icon={<Glasses />} />}
              onClick={() => setShowIntroduction(true)}
            >
              {t('common:read_introduction')}
            </Button>
          </span>
        </Modal.Content>
        <Modal.Content>
          <FormControl fieldset>
            <FormLabel className="text-h4-sm md:text-h4-md xl:text-h4-lg">{t('common:settings')}</FormLabel>
            <Switch
              color="gronsta"
              checked={colorScheme === ColorSchemeMode.Dark}
              onChange={() =>
                setColorScheme(colorScheme === ColorSchemeMode.Dark ? ColorSchemeMode.Light : ColorSchemeMode.Dark)
              }
            >
              {t('common:darkmode')}
            </Switch>
            <Switch color="gronsta" checked={highcontrast} onChange={() => setHighcontrast(!highcontrast)}>
              {t('common:highcontrast')}
            </Switch>
          </FormControl>
        </Modal.Content>
        <Modal.Footer>
          <Button color="vattjom" onClick={onClose}>
            {t('common:continue_scenario')}
          </Button>
          <Button variant="secondary" onClick={onQuit}>
            {isPlaying ? t('common:quit_scenario') : t('common:restart')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
