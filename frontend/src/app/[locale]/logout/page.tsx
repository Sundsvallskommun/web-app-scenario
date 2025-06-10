'use client';

import { useUserStore } from '@services/user-service/user-service';
import { apiURL } from '@utils/api-url';
import { appURL } from '@utils/app-url';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout: React.FC = () => {
  const router = useRouter();

  const resetUser = useUserStore((state) => state.reset);

  useEffect(() => {
    resetUser();
    sessionStorage.clear();

    const query = new URLSearchParams({
      successRedirect: `${appURL()}/login?loggedout`,
    });

    const url = new URL(apiURL('/saml/logout'));
    url.search = query.toString();

    router.push(url.toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default Logout;
