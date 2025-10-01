import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@sk-web-gui/react';
import { FastForward } from 'lucide-react';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';
import { IntroText } from '@interfaces/intro-text.interface';
import { textToSpeech } from '@sk-web-gui/ai';

interface IntroProps extends WizardPageProps {
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}
export const Intro: React.FC<IntroProps> = ({
  onNext,
  transitionDuration = 1000,
}) => {
  const { t } = useTranslation('intro');

  const [opacity, setOpacity] = useState<number>(0);
  const [mainOpacity, setMainOpacity] = useState<number>(0);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  //NOTE: Should these come from BE?
  const texts: IntroText[] = [
    { text: t('intro:1'), duration: 10000 },
    { text: t('intro:2'), duration: 7000 },
    { text: t('intro:3'), duration: 7000 },
    { text: t('intro:4'), duration: 7000 },
    { text: t('intro:5'), duration: 7000 },
    { text: t('intro:6'), duration: 7000 },
  ];

  const goToNext = () => {
    setTimeout(() => {
      if (currentTextIndex === texts.length - 1) {
        onNext?.();
      } else {
        setCurrentTextIndex(currentTextIndex + 1);
      }
    }, transitionDuration);
  };

  const handleNextSlide = () => {
    setTimeout(() => {
      if (currentTextIndex === texts.length - 1) {
        setMainOpacity(0);
      } else {
        setOpacity(0);
      }
      goToNext();
    }, texts[currentTextIndex].duration);
  };

  useEffect(() => {
    setCurrentTextIndex(0);
    setMainOpacity(1);
    setTimeout(() => {
      setOpacity(1);
      handleNextSlide();
    }, transitionDuration * 2);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      handleNextSlide();
      textToSpeech(texts[currentTextIndex].text);
    }, transitionDuration);
    //eslint-disable-next-line
  }, [currentTextIndex]);

  return (
    <>
      <div
        className="p-32 absolute top-0 right-0 transition-opacity"
        style={{
          opacity: mainOpacity,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        <Button
          size="sm"
          variant="tertiary"
          onClick={onNext}
          leftIcon={<Icon icon={<FastForward />} />}
        >
          {t('common:skip_intro')}
        </Button>
      </div>
      <div
        className="w-full p-32 text-center max-w-content transition-opacity"
        style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
      >
        <h1>{texts[currentTextIndex].text}</h1>
      </div>
    </>
  );
};
