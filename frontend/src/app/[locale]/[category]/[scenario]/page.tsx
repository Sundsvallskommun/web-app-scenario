'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { Chat } from '@components/scenario/Chat';
import { End } from '@components/scenario/End';
import { Intro } from '@components/scenario/Intro';
import { ScenarioStart } from '@components/scenario/ScenarioStart';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { useScenario, useScenarioIntroTexts } from '@services/scenario-service/use-scenario.hook';
import { ChatHistoryEntry, useAssistantStore, useChat } from '@sk-web-gui/ai';
import { apiURL } from '@utils/api-url';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useShallow } from 'zustand/react/shallow';

interface Page {
  component: React.JSX.Element;
  showBackground: boolean;
}

export default function Scenario() {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const params = useParams<{ category: string; scenario: string }>();
  const categoryId = Number(params.category);
  const scenarioId = Number(params.scenario);
  const { loaded, loading, data } = useScenario(categoryId, scenarioId);
  const { loaded: introLoaded, data: introTexts } = useScenarioIntroTexts();
  const [setScenario, setScenarioIntroTexts] = useSessionStorage(
    useShallow((state) => [state.setScenario, state.setScenarioIntroTexts])
  );
  const [settings, setSettings, setInfo] = useAssistantStore(
    useShallow((state) => [state.settings, state.setSettings, state.setInfo])
  );

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

  useEffect(() => {
    if (!loading && loaded && !data) {
      router.replace('/start');
    }
  }, [data, loaded, loading, router]);

  useEffect(() => {
    if (loaded && data) {
      setScenario(data);
      setInfo({
        name: data.name,
        id: data.assistantId,
      });
      setSettings({
        ...settings,
        assistantId: data.assistantId,
        //NOTE: This is a bug in shared components - hash should not be needed
        hash: 'undefined',
      });
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [setInfo, data, loaded, setScenario, setSettings]);

  useEffect(() => {
    if (introLoaded) {
      setScenarioIntroTexts(introTexts);
    }
  }, [introLoaded, introTexts, setScenarioIntroTexts]);

  const lastAssistantEntry = history.findLast((entry: ChatHistoryEntry) => entry.origin === 'assistant');

  const pages: Page[] = [
    {
      component: <Intro texts={introTexts} transitionDuration={transitionDuration} onNext={() => setPage(1)} />,
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
  const isReady = loaded && introLoaded && data;

  return (
    <DefaultLayout
      backgroundSrc={data?.image?.url ? apiURL(data.image.url) : undefined}
      showBackground={!showInstaller && pages[page].showBackground}
      transitionDuration={transitionDuration}
    >
      <main className="flex w-full flex-col grow shrink h-full max-h-full overflow-hidden justify-center items-center gap-0">
        {isReady ? pages[page].component : <LoaderFullScreen />}
      </main>
    </DefaultLayout>
  );
}
