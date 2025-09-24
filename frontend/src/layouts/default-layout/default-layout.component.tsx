'use client';

import { cx } from '@sk-web-gui/react';
import { getBackgroundImage } from '@utils/get-background-image.util';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import { getImageProps } from 'next/image';

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  showBackground?: boolean;
  backgroundSrc?: string;
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const {
    className,
    showBackground,
    backgroundSrc: _backgroundSrc,
    transitionDuration = 1000,
    ...rest
  } = props;
  const highcontrast = useLocalStorage((state) => state.highcontrast);

  const backgroundSrc =
    _backgroundSrc || process.env.NEXT_PUBLIC_BACKGROUND_IMAGE;

  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    width: 1280,
    height: 1280,
    src: backgroundSrc || '',
  });

  const backgroundImage = getBackgroundImage(srcSet);

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
          'w-full h-full overflow-hidden bg-cover bg-center absolute top-0 left-0 right-0 bottom-0 z-0 transition-opacity',
          { ['bg-background-100 bg-blend-multiply']: highcontrast }
        )}
        style={{
          backgroundImage: backgroundSrc ? backgroundImage : undefined,
          opacity: getOpacity(),
          transitionDuration: `${transitionDuration}ms`,
        }}
      ></div>
      <div className="flex flex-col w-full h-full overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-10">
        <div
          className={cx(
            'grow shrink overflow-hidden flex w-full justify-center pb-24',
            className
          )}
          {...rest}
        />
      </div>
    </div>
  );
};

export default DefaultLayout;
