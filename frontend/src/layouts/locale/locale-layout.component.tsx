'use client';

import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { useUserStore } from '@services/user-service/user-service';
import { normalizeRoutePath } from '@utils/protected-routes';
import { usePathname } from 'next/navigation';

interface LocaleLayoutProps {
  children?: React.ReactNode;
}

export const LocaleLayout: React.FC<LocaleLayoutProps> = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const path = usePathname();
  const normalizedPath = normalizeRoutePath(path || '/');

  const showChildren = (user.name && user.username) || normalizedPath === '/login' || normalizedPath === '/logout';

  return showChildren ? children : <LoaderFullScreen />;
};
