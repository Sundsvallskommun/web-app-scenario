import { Button, cx } from '@sk-web-gui/react';
import React from 'react';

interface MegaButtonProps
  extends
    Omit<React.ComponentProps<typeof Button>, 'size'>,
    Omit<React.ComponentPropsWithRef<'button'>, 'size' | 'color'> {}

export const MegaButton = React.forwardRef<HTMLButtonElement, MegaButtonProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <Button
        ref={ref}
        className={cx(
          '!h-46 max-h-46 min-w-46 p-8 text-h3-sm',
          'xl:!h-56 xl:max-h-56 xl:min-w-56 xl:p-12 xl:text-h2-md',
          className
        )}
        {...rest}
      />
    );
  }
);

MegaButton.displayName = 'MegaButton';
