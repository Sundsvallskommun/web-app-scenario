'use client';

import { Button, Icon } from '@sk-web-gui/react';
import { Pause } from 'lucide-react';
import { useState } from 'react';
import { PauseModal } from './components/pause-modal.component';
import { useTranslation } from 'react-i18next';

interface PauseControlProps {
  onQuit: () => void;
  isPlaying?: boolean;
}

export const PauseControl: React.FC<PauseControlProps> = ({
  onQuit,
  isPlaying,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <PauseModal
        open={open}
        onClose={() => setOpen(false)}
        onQuit={onQuit}
        isPlaying={isPlaying}
      />
      <div className="absolute p-24 top-0 right-0">
        <Button
          data-cy="pause-button"
          size="sm"
          rounded
          iconButton
          aria-label={t('common:pause')}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          leftIcon={<Icon icon={<Pause />} />}
        />
      </div>
    </>
  );
};
