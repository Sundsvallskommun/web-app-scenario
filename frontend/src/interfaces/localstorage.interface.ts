import { ColorSchemeMode } from '@sk-web-gui/react';

export interface LocalStorage {
  colorScheme: ColorSchemeMode;
  setColorScheme: (color: ColorSchemeMode) => void;
  highcontrast: boolean;
  setHighContrast: (highcontrast: boolean) => void;
}
