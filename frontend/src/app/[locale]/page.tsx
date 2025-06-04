'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useAssistantStore } from '@sk-web-gui/ai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
  const [apiBaseUrl, setApiBaseUrl] = useAssistantStore((state) => [state.apiBaseUrl, state.setApiBaseUrl]);

  useEffect(() => {
    if (!apiBaseUrl) {
      setApiBaseUrl(process.env.NEXT_PUBLIC_INTRIC_API_URL ?? '');
    }
  }, [apiBaseUrl]);
  const router = useRouter();

  useEffect(() => {
    router.push('/example');
  }, [router]);

  return <LoaderFullScreen />;
};

export default Index;
