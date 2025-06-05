import { useEffect, useRef, useState } from 'react';
import { AIGameFeed } from '@components/ai-game-feed';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from '@sk-web-gui/react';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';
import { ChatHistory, ChatHistoryEntry } from '@sk-web-gui/ai';

interface EndProps extends WizardPageProps {
  history: ChatHistory;
  transitionDuration?: number;
}

export const End: React.FC<EndProps> = ({
  history,
  transitionDuration = 1000,
  onRestart,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, transitionDuration);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, scrollRef]);

  const handleRestart = () => {
    setOpacity(0);
    setTimeout(() => {
      onRestart?.();
    }, transitionDuration);
  };

  const entry = history
    .filter((entry: ChatHistoryEntry) => entry.origin === 'assistant')
    .at(-1);

  return (
    <div
      className="flex flex-col justify-between items-center grow transition-opacity"
      style={{ opacity, transitionDuration: `${transitionDuration}ms` }}
    >
      <header className="flex flex-col items-center text-center py-80">
        <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg">
          {t('common:app_name')}
        </h1>
        <p className="text-display-3-sm md:text-display-3-md xl:text-display-3-lg">
          {t('common:scenario_over')}
        </p>
      </header>
      <div
        className="overflow-y-auto w-full flex flex-col shrink justify-center items-center px-16 hidden-scrollbar"
        ref={scrollRef}
      >
        {!entry?.done ?
          <Spinner />
        : <AIGameFeed
            history={[entry]}
            className="w-full max-w-[1000px] mx-auto"
          />
        }
      </div>
      <footer className="flex flex-col items-center text-center py-80">
        <Button size="lg" rounded onClick={handleRestart}>
          {t('common:to_the_beginning')}
        </Button>
      </footer>
    </div>
  );
};
