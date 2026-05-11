import { useEffect, useState } from 'react';
import { Button, Icon } from '@sk-web-gui/react';
import { FastForward } from 'lucide-react';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';
import { textToSpeech } from '@sk-web-gui/ai';
import { PublicScenarioIntroText } from '@data-contracts/backend/data-contracts';
import { useTranslation } from 'react-i18next';

interface IntroProps extends WizardPageProps {
  texts: PublicScenarioIntroText[];
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getDuration = (text: string) => {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return clamp(2500 + wordCount * 350, 5000, 14000);
};

export const Intro: React.FC<IntroProps> = ({ texts, onNext, transitionDuration = 1000 }) => {
  const { t } = useTranslation('common');
  const [opacity, setOpacity] = useState<number>(0);
  const [mainOpacity, setMainOpacity] = useState<number>(0);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentTextIndex(0);
    setOpacity(0);
    setMainOpacity(texts.length ? 1 : 0);
  }, [texts]);

  useEffect(() => {
    if (!texts.length) {
      onNext?.();
      return;
    }

    const currentSlide = texts[currentTextIndex];
    const currentDuration = getDuration(currentSlide.text);
    const isLastSlide = currentTextIndex === texts.length - 1;

    setOpacity(0);

    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
      textToSpeech(currentSlide.text);
    }, transitionDuration);

    const fadeOutTimer = setTimeout(() => {
      if (isLastSlide) {
        setMainOpacity(0);
      } else {
        setOpacity(0);
      }
    }, transitionDuration + currentDuration);

    const nextTimer = setTimeout(() => {
      if (isLastSlide) {
        onNext?.();
      } else {
        setCurrentTextIndex((index) => index + 1);
      }
    }, transitionDuration * 2 + currentDuration);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(nextTimer);
    };
  }, [currentTextIndex, onNext, texts, transitionDuration]);

  return (
    <>
      <div
        className="p-32 absolute top-0 right-0 transition-opacity"
        style={{
          opacity: mainOpacity,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        <Button size="sm" variant="tertiary" onClick={onNext} leftIcon={<Icon icon={<FastForward />} />}>
          {t('common:skip_intro')}
        </Button>
      </div>
      <div
        className="w-full p-32 text-center max-w-content transition-opacity"
        style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
      >
        <h1>{texts[currentTextIndex]?.text}</h1>
      </div>
    </>
  );
};
