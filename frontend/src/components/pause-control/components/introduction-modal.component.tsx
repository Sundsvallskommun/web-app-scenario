'use client';

import { Button, Modal } from '@sk-web-gui/react';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useTranslation } from 'react-i18next';

interface IntroductionModalProps {
  onClose: () => void;
  open: boolean;
}

export const IntroductionModal: React.FC<IntroductionModalProps> = ({ onClose, open }) => {
  const { t } = useTranslation('common');
  const [scenario, scenarioIntroTexts] = useSessionStorage((state) => [state.scenario, state.scenarioIntroTexts]);

  return (
    <Modal
      data-cy="instruction-modal"
      show={open}
      onClose={onClose}
      label={t('common:introduction')}
      labelAs="h1"
      className="w-[78rem] max-h-[90vh] "
    >
      <Modal.Content className="overflow-y-auto">
        <h2>{t('common:app_name')}</h2>
        {scenarioIntroTexts.map((introText) => (
          <p key={introText.id}>{introText.text}</p>
        ))}
        <br />
        {!!scenario && (
          <>
            <h3>{scenario?.name}</h3>
            <p>{scenario?.description}</p>
          </>
        )}
      </Modal.Content>
      <Modal.Footer>
        <Button color="vattjom" onClick={onClose}>
          {t('common:i_understand')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
