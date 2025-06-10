'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, FormErrorMessage, Icon } from '@sk-web-gui/react';
import EmptyLayout from '@layouts/empty-layout/empty-layout.component';
import LoaderFullScreen from '@components/loader/loader-fullscreen';
import { appURL } from '@utils/app-url';
import { useTranslation } from 'react-i18next';
import { apiURL } from '@utils/api-url';
import { capitalize } from 'underscore.string';
import { LogIn } from 'lucide-react';

// Turn on/off automatic login
const autoLogin = false;

const Login: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const isLoggedOut = searchParams.get('loggedout') === '';
  const failMessage = searchParams.get('failMessage');

  const initalFocus = useRef<HTMLButtonElement>(null);
  const setInitalFocus = () => {
    setTimeout(() => {
      initalFocus?.current?.focus();
    });
  };

  const onLogin = () => {
    const searchPath = searchParams.get('path');
    const nonLoginPath = !pathName?.match(/\/login/) && pathName; // Contains path as long as it's not /login
    const nonLoginSearch = !searchPath?.match(/\/login|\/logout/) && searchPath; // Contains redirect path as long as it's not /login or /logout
    const path = nonLoginPath ?? nonLoginSearch ?? '/';

    const url = new URL(apiURL('/saml/login'));
    const queries = new URLSearchParams({
      successRedirect: `${appURL(path as string)}`,
      failureRedirect: `${appURL()}/login`,
    });
    url.search = queries.toString();
    // NOTE: send user to login with SSO
    router.push(url.toString());
  };

  useEffect(() => {
    setInitalFocus();
    if (!router) return;

    if (isLoggedOut) {
      router.push('/login');
      setIsLoading(false);
    } else {
      if (failMessage === 'NOT_AUTHORIZED' && autoLogin) {
        // autologin
        onLogin();
      } else if (failMessage) {
        setErrorMessage(t(`login:errors.${failMessage}`));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    // to not flash the login-screen on autologin
    return (
      <EmptyLayout>
        <LoaderFullScreen />
      </EmptyLayout>
    );
  }

  return (
    <EmptyLayout>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col justify-between h-full items-center grow">
          <div className="flex grow flex-col gap-24 text-center justify-center items-center transition-opacity">
            <h1 className="text-display-1-sm md:text-display-1-md xl:text-display-1-lg m-0">
              {t('common:app_name')}
            </h1>
            <p className="text-display-3-sm md:text-display-3-md xl:text-display-3-lg mb-24">
              {t('login:description')}
            </p>
            <Button
              size="lg"
              rounded
              leftIcon={<Icon icon={<LogIn />} />}
              onClick={() => onLogin()}
              data-cy="loginButton"
            >
              {capitalize(t('common:login'))}
            </Button>

            {errorMessage && (
              <FormErrorMessage className="mt-lg">
                {errorMessage}
              </FormErrorMessage>
            )}
          </div>
        </div>
      </main>
    </EmptyLayout>
  );
};

export default Login;
