'use client';

import { cx, Logo, useThemeQueries } from '@sk-web-gui/react';
import { apiURL } from '@utils/api-url';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import React from 'react';

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  showBackground?: boolean;
  backgroundSrc?: string;
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
  fadeIn?: boolean;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const {
    className,
    showBackground,
    backgroundSrc: _backgroundSrc,
    transitionDuration = 1000,
    fadeIn = true,
    ...rest
  } = props;
  const highcontrast = useLocalStorage((state) => state.highcontrast);
  const { isMaxSmallDevice } = useThemeQueries();
  const backgroundSrc = _backgroundSrc ?? apiURL('files/default.jpg');

  const backgroundImage = `url(${backgroundSrc})`;

  const getOpacity = () => {
    if (!showBackground) {
      return 0;
    }

    switch (highcontrast) {
      case true:
        return 0.25;
      case false:
        return 0.75;
      default:
        return 0.75;
    }
  };

  return (
    <div className="w-dvw h-dvh portrait:max-h-dvh bg-background-content text-dark-primary overflow-hidden relative">
      <div
        className={cx(
          'w-full h-full overflow-hidden bg-cover bg-center fixed top-0 left-0 right-0 bottom-0 z-0 transition-opacity',
          {
            ['bg-background-100 bg-blend-multiply']: highcontrast,
          }
        )}
        style={{
          backgroundImage: backgroundSrc ? backgroundImage : undefined,
          opacity: getOpacity(),
          transitionDuration: `${transitionDuration}ms`,
        }}
      ></div>
      <div className="fixed bottom-12 right-12 lg:bottom-32 lg:right-32 opacity-80 hidden h-52 md:h-auto sm:block w-auto md:w-[12rem] lg:w-[14rem] xl:w-[18rem]">
        <Logo
          variant={isMaxSmallDevice ? 'symbol' : 'logo'}
          className="h-stretch"
        />
      </div>
      <div className="flex flex-col w-full h-full overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-10">
        <div
          className={cx('grow shrink flex w-full overflow-hidden', className)}
          {...rest}
        />
      </div>
    </div>
  );
};

export default DefaultLayout;
