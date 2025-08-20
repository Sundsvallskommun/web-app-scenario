'use client';

import { useTranslation } from 'react-i18next';
import { MegaButton } from '../mega-button/mega-button.component';
import { FormEvent, useState } from 'react';
import { InputSection } from '@sk-web-gui/ai';
import { Button, Icon } from '@sk-web-gui/react';
import { ArrowLeft } from 'lucide-react';

interface GameControlsProps {
  onReact?: (value: string) => void;
  disabled?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onReact,
  disabled,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState<string>('');

  const { t } = useTranslation();

  const handleSendQuery = (e: FormEvent) => {
    e.preventDefault();
    if (value) {
      onReact?.(value);
      setValue('');
      setShowInput(false);
    }
  };

  return (
    <div className="flex h-64 w-full max-w-[54rem] justify-between items-center">
      {showInput ?
        <form onSubmit={handleSendQuery} className="w-full">
          <InputSection.Wrapper className="rounded-cards w-full">
            <Button
              variant="secondary"
              iconButton
              rounded
              disabled={disabled}
              leftIcon={<Icon icon={<ArrowLeft />} />}
              onClick={() => setShowInput(false)}
            />
            <InputSection.Input
              value={value}
              disabled={disabled}
              onChange={(e) => setValue(e.target.value)}
            />
            <InputSection.Button type="submit" disabled={disabled}>
              {t('common:send')}
            </InputSection.Button>
          </InputSection.Wrapper>
        </form>
      : <>
          <MegaButton
            color="vattjom"
            rounded
            onClick={() => onReact?.('A')}
            disabled={disabled}
          >
            A
          </MegaButton>
          <MegaButton
            color="juniskar"
            rounded
            onClick={() => onReact?.('B')}
            disabled={disabled}
          >
            B
          </MegaButton>
          <MegaButton
            color="gronsta"
            rounded
            onClick={() => onReact?.('C')}
            disabled={disabled}
          >
            C
          </MegaButton>
          <MegaButton
            color="bjornstigen"
            rounded
            disabled={disabled}
            onClick={() => setShowInput(true)}
          >
            {`D: ${t('common:other')}`}
          </MegaButton>
        </>
      }
    </div>
  );
};
