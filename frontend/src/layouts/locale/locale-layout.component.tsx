'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useUserStore } from '@services/user-service/user-service';
import { usePathname } from 'next/navigation';

interface LocaleLayoutProps {
  children?: React.ReactNode;
}

export const LocaleLayout: React.FC<LocaleLayoutProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const path = usePathname();

  const showChildren =
    (user.name && user.username) || path === '/login' || path === '/logout';

  return showChildren ? children : <LoaderFullScreen />;
};
