'use client';

import { Button, Modal } from '@sk-web-gui/react';
import { useTranslation } from 'react-i18next';

interface IntroductionModalProps {
  onClose: () => void;
  open: boolean;
}

export const IntroductionModal: React.FC<IntroductionModalProps> = ({ onClose, open }) => {
  const { t } = useTranslation(['common', 'intro']);
  return (
    <Modal show={open} onClose={onClose} label={t('common:introduction')} labelAs="h1" className="w-[78rem]">
      <Modal.Content>
        <h2>{t('common:app_name')}</h2>
        <p>{t('intro:1')}</p>
        <p>{t('intro:2')}</p>
        <p>{t('intro:3')}</p>
        <p>{t('intro:4')}</p>
        <p>{t('intro:5')}</p>
        <p>{t('intro:6')}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button color="vattjom" onClick={onClose}>
          {t('common:i_understand')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
