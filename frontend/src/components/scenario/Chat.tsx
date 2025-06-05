'use client';

import { AIGameFeed } from '@components/ai-game-feed';
import { WizardPageProps } from '@interfaces/wizard-page-props.interface';
import { ChatHistory } from '@sk-web-gui/ai';
import { useEffect, useRef } from 'react';
import { GameControls } from '@components/game-controls/game-controls.component';
import { PauseControl } from '@components/pause-control/pause-control.component';

interface ChatProps extends WizardPageProps {
  history: ChatHistory;
  sendQuery: (query: string, addToHistory?: boolean) => void;
  done?: boolean;
}

export const Chat: React.FC<ChatProps> = ({ history, sendQuery, onNext, done }) => {
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
        className="overflow-y-auto grow w-full flex flex-col shrink justify-end px-16 hidden-scrollbar"
        ref={scrollRef}
      >
        <AIGameFeed history={history} className="w-full max-w-[1000px] mx-auto" />
      </div>

      <GameControls onReact={handleSendQuery} disabled={!done} />
    </>
  );
};
