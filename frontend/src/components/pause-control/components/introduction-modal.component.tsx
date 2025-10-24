'use client';

import { Button, Modal } from '@sk-web-gui/react';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useTranslation } from 'react-i18next';

interface IntroductionModalProps {
  onClose: () => void;
  open: boolean;
}

export const IntroductionModal: React.FC<IntroductionModalProps> = ({
  onClose,
  open,
}) => {
  const { t } = useTranslation(['common', 'intro']);
  const scenario = useSessionStorage((state) => state.scenario);
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
        <p>{t('intro:1')}</p>
        <p>{t('intro:2')}</p>
        <p>{t('intro:3')}</p>
        <p>{t('intro:4')}</p>
        <p>{t('intro:5')}</p>
        <p>{t('intro:6')}</p>
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
