import React from 'react';
import { Button, Modal } from '@sk-web-gui/react';
import { useRouter } from 'next/navigation';
import { useScenario } from '@services/scenario-service/use-scenario.hook';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { apiURL } from '@utils/api-url';

interface PickScenarioModalProps {
  scenarioId: number;
  isOpen: boolean;
  handleClose: () => void;
  setOpacity: (number: number) => void;
  setShowBackground: (boolean: boolean) => void;
}

export const PickScenarioModal: React.FC<PickScenarioModalProps> = ({
  scenarioId,
  isOpen,
  handleClose,
  setOpacity,
  setShowBackground,
}: PickScenarioModalProps) => {
  const transitionDuration = 1000;
  const router = useRouter();
  const { t } = useTranslation();

  const { data } = useScenario(scenarioId);

  const handleScenarioPick = () => {
    handleClose();
    setOpacity(0);
    setTimeout(() => {
      setShowBackground(false);
      setTimeout(() => {
        router.push(`/${scenarioId}`);
      }, transitionDuration);
    }, transitionDuration);
  };

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      label={t('scenario:pick')}
      className="max-w-[60rem]"
    >
      <Modal.Content>
        <Image
          alt=""
          src={
            data?.image?.url ?
              apiURL(data?.image?.url)
            : apiURL('/files/default.jpg')
          }
          width={600}
          height={600}
        />
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
      </Modal.Content>
      <Modal.Footer>
        <Button color="vattjom" onClick={handleScenarioPick}>
          {t('scenario:start')}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          {t('scenario:goBack')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
