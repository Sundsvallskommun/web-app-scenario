'use client';

import { InstallPromptEvent } from '@interfaces/install-prompt-event.type';
import {
  Button,
  ColorSchemeMode,
  Icon,
  PopupMenu,
  Switch,
} from '@sk-web-gui/react';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { isRunningStandalone } from '@utils/pwa-mode';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { LogOut, MonitorDown, Settings2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import { capitalize } from 'underscore.string';
import { useRouter } from 'next/navigation';

export const SettingsMenu: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [highcontrast, setHighcontrast, colorScheme, setColorScheme] =
    useLocalStorage(
      useShallow((state) => [
        state.highcontrast,
        state.setHighContrast,
        state.colorScheme,
        state.setColorScheme,
      ])
    );

  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [standalone, setStandalone] = useState<boolean>(false);
  const installRef = useRef<InstallPromptEvent>(null);

  const pwa = useSessionStorage((state) => state.pwa);

  useEffect(() => {
    const standaloneMode = isRunningStandalone();
    setStandalone(standaloneMode);

    if (standaloneMode) {
      return;
    }

    const handleInstallPrompt = (event: InstallPromptEvent) => {
      event.preventDefault();
      installRef.current = event;
      setCanInstall(true);
    };

    globalThis.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => {
      globalThis.removeEventListener(
        'beforeinstallprompt',
        handleInstallPrompt
      );
    };
    //eslint-disable-next-line
  }, []);

  const handleInstall = () => {
    installRef?.current?.prompt?.();
  };
  return (
    <div className="absolute m-24 top-0 right-12">
      <PopupMenu position="under" align="end">
        <PopupMenu.Button
          size="sm"
          rounded
          iconButton
          leftIcon={<Icon icon={<Settings2 />} />}
          data-cy="settings-button"
        />
        <PopupMenu.Panel data-cy="settings-menu">
          <PopupMenu.Items>
            <PopupMenu.Item>
              <Switch
                color="gronsta"
                checked={colorScheme === ColorSchemeMode.Dark}
                data-cy="settings-darkmode"
                onChange={() =>
                  setColorScheme(
                    colorScheme === ColorSchemeMode.Dark ?
                      ColorSchemeMode.Light
                    : ColorSchemeMode.Dark
                  )
                }
              >
                {t('common:darkmode')}
              </Switch>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Switch
                color="gronsta"
                checked={highcontrast}
                onChange={() => setHighcontrast(!highcontrast)}
                data-cy="settings-highcontrastmed"
              >
                {t('common:highcontrast')}
              </Switch>
            </PopupMenu.Item>
            {canInstall && !pwa && !standalone && (
              <PopupMenu.Group>
                <PopupMenu.Item>
                  <Button
                    leftIcon={<Icon icon={<MonitorDown />} />}
                    onClick={handleInstall}
                  >
                    {t('common:install')}
                  </Button>
                </PopupMenu.Item>
              </PopupMenu.Group>
            )}
            <PopupMenu.Group>
              <PopupMenu.Item>
                <Button
                  leftIcon={<Icon icon={<LogOut />} />}
                  onClick={() => router.push('/logout')}
                  data-cy="settings-logout"
                >
                  {capitalize(t('common:logout'))}
                </Button>
              </PopupMenu.Item>
            </PopupMenu.Group>
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
};
