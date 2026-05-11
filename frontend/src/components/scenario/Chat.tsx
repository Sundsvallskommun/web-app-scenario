'use client';

import { AIGameFeed } from '@components/ai-game-feed';
import { GameControls } from '@components/game-controls/game-controls.component';
import { PauseControl } from '@components/pause-control/pause-control.component';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';
import { ChatHistory } from '@sk-web-gui/ai';
import { useEffect, useRef } from 'react';

interface ChatProps extends WizardPageProps {
  history: ChatHistory;
  sendQuery: (query: string, addToHistory?: boolean) => void;
  done?: boolean;
}

export const Chat: React.FC<ChatProps> = ({
  history,
  sendQuery,
  onNext,
  done,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendQuery = (query: string) => {
    if (query) {
      sendQuery(query);
    }
  };

  const handleQuit = () => {
    sendQuery('Änglavakt', false);
    onNext?.();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, scrollRef]);

  return (
    <>
      <PauseControl isPlaying onQuit={handleQuit} />
      <div
        className="h-full max-h-dvh overflow-y-scroll grow w-full shrink-0 px-16 block pb-[8.8rem] lg:pb-[10.4rem] xl:pb-[12.8rem]"
        ref={scrollRef}
      >
        <AIGameFeed
          history={history}
          className="w-full max-w-[1000px] mx-auto grow justify-end shrink-0 min-h-full pt-96"
        />
      </div>

      <GameControls onReact={handleSendQuery} disabled={!done} />
    </>
  );
};
