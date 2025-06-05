'use client';

import { Button, ColorSchemeMode, Icon, PopupMenu, Switch } from '@sk-web-gui/react';
import { MonitorDown, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { useSessionStorage } from '@utils/use-sessionstorage.hook';
import { useShallow } from 'zustand/shallow';
import { InstallPromptEvent } from '@interfaces/install-prompt-event.type';

export const SettingsMenu: React.FC = () => {
  const { t } = useTranslation();
  const [highcontrast, setHighcontrast, colorScheme, setColorScheme] = useLocalStorage(
    useShallow((state) => [state.highcontrast, state.setHighContrast, state.colorScheme, state.setColorScheme])
  );

  const [pwaSupported, setPwaSupported] = useState<boolean>(true);
  const installRef = useRef<InstallPromptEvent>(null);

  const pwa = useSessionStorage((state) => state.pwa);

  useEffect(() => {
    const handleInstallPrompt = (event: InstallPromptEvent) => {
      event.preventDefault();
      setPwaSupported(true);
      installRef.current = event;
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
    //eslint-disable-next-line
  }, []);

  const handleInstall = () => {
    installRef?.current?.prompt?.();
  };
  return (
    <div className="absolute m-24 top-0 right-0">
      <PopupMenu position="under" align="end">
        <PopupMenu.Button size="sm" rounded iconButton leftIcon={<Icon icon={<Settings2 />} />} />
        <PopupMenu.Panel>
          <PopupMenu.Items>
            <PopupMenu.Item>
              <Switch
                color="gronsta"
                checked={colorScheme === ColorSchemeMode.Dark}
                onChange={() =>
                  setColorScheme(colorScheme === ColorSchemeMode.Dark ? ColorSchemeMode.Light : ColorSchemeMode.Dark)
                }
              >
                {t('common:darkmode')}
              </Switch>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Switch color="gronsta" checked={highcontrast} onChange={() => setHighcontrast(!highcontrast)}>
                {t('common:highcontrast')}
              </Switch>
            </PopupMenu.Item>
            {(installRef.current || pwaSupported) && !pwa && (
              <PopupMenu.Group>
                <PopupMenu.Item>
                  <Button leftIcon={<Icon icon={<MonitorDown />} />} onClick={handleInstall}>
                    {t('common:install')}
                  </Button>
                </PopupMenu.Item>
              </PopupMenu.Group>
            )}
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
};
