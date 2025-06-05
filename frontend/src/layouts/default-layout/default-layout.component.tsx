'use client';

import { cx } from '@sk-web-gui/react';
import { useLocalStorage } from '@utils/use-localstorage.hook';

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  showBackground?: boolean;
  /**
   * Duration of the transition effect in milliseconds.
   * @default 1000
   */
  transitionDuration?: number;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { className, showBackground, transitionDuration = 1000, ...rest } = props;
  const highcontrast = useLocalStorage((state) => state.highcontrast);
  const backgroundSrc = process.env.NEXT_PUBLIC_BACKGROUND_IMAGE;

  return (
    <div className="w-dvw h-dvh portrait:max-h-dvh bg-background-content text-dark-primary overflow-hidden relative">
      <div
        className={cx(
          'w-full h-full overflow-hidden bg-cover absolute top-0 left-0 right-0 bottom-0 z-0 transition-opacity',
          { ['bg-background-100 bg-blend-multiply']: highcontrast }
        )}
        style={{
          backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : undefined,
          opacity:
            showBackground ?
              highcontrast ? 0.25
              : 0.75
            : 0,
          transitionDuration: `${transitionDuration}ms`,
        }}
      ></div>
      <div className="flex flex-col w-full h-full overflow-hidden absolute top-0 left-0 right-0 bottom-0 z-10">
        <div className={cx('grow shrink overflow-hidden flex w-full justify-center pb-24', className)} {...rest} />
      </div>
    </div>
  );
};

export default DefaultLayout;
