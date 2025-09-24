import LoginGuard from '@components/login-guard/login-guard';
import { ConfirmationDialogContextProvider, GuiProvider } from '@sk-web-gui/react';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import 'dayjs/locale/sv';
import type { AppProps } from 'next/app';
import { useShallow } from 'zustand/react/shallow';

export function MyApp({ Component, pageProps }: AppProps) {
  const colorScheme = useLocalStorage(useShallow((state) => state.colorScheme));

  return (
    <GuiProvider colorScheme={colorScheme}>
      <ConfirmationDialogContextProvider>
        <LoginGuard>
          <Component {...pageProps} />
        </LoginGuard>
      </ConfirmationDialogContextProvider>
    </GuiProvider>
  );
}
