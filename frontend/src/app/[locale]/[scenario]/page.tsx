'use client';

import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { ChatHistoryEntry, useChat } from '@sk-web-gui/ai';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Chat } from '@components/scenario/Chat';
import { End } from '@components/scenario/End';
import { Intro } from '@components/scenario/Intro';
import { ScenarioStart } from '@components/scenario/ScenarioStart';

interface Page {
  component: React.JSX.Element;
  showBackground: boolean;
}
export default function Scenario() {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const [webMode, pwa] = useSessionStorage((state) => [state.webMode, state.pwa], shallow);

  const transitionDuration = 1000;

  const { sendQuery, history, newSession, done } = useChat();

  const handleStartScenario = () => {
    setPage(2);
    sendQuery('1', [], { question: false, answer: true });
  };

  const handleRestart = () => {
    newSession();
    router.push('/start');
  };

  useEffect(() => {
    newSession();
  }, [newSession]);

  const lastAssistantEntry = history.filter((entry: ChatHistoryEntry) => entry.origin === 'assistant').at(-1);

  const pages: Page[] = [
    {
      component: <Intro transitionDuration={transitionDuration} onNext={() => setPage(1)} />,
      showBackground: false,
    },
    {
      component: <ScenarioStart onNext={() => handleStartScenario()} onRestart={() => handleRestart()} />,
      showBackground: true,
    },
    {
      component: (
        <Chat
          history={history}
          sendQuery={(q, add) => sendQuery(q, [], { question: add ?? true, answer: true })}
          done={done || lastAssistantEntry?.done}
          onNext={() => setPage(3)}
        />
      ),
      showBackground: true,
    },
    {
      component: <End history={history} transitionDuration={transitionDuration} onRestart={() => handleRestart()} />,
      showBackground: true,
    },
  ];

  const showInstaller = !webMode && !pwa && page === 0;

  return (
    <DefaultLayout
      showBackground={!showInstaller && pages[page].showBackground}
      transitionDuration={transitionDuration}
    >
      <main className="flex w-full overflow-hidden flex-col grow shrink h-full max-h-full justify-center items-center pb-16 gap-16 md:gap-32">
        {pages[page].component}
      </main>
    </DefaultLayout>
  );
}
