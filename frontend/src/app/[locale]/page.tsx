'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/example');
  }, [router]);

  return <LoaderFullScreen />;
};

export default Index;
