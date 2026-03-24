export const isRunningStandalone = (): boolean => {
  if (globalThis.window === undefined) {
    return false;
  }

  const navigatorWithStandalone = globalThis.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    globalThis.matchMedia('(display-mode: standalone)').matches ||
    navigatorWithStandalone.standalone === true ||
    globalThis.document.referrer.startsWith('android-app://')
  );
};
