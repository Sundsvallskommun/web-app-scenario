import { Button, cx } from '@sk-web-gui/react';
import React from 'react';

interface MegaButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'size'>,
    Omit<React.ComponentPropsWithRef<'button'>, 'size' | 'color'> {}

export const MegaButton = React.forwardRef<HTMLButtonElement, MegaButtonProps>((props, ref) => {
  const { className, ...rest } = props;
  return <Button ref={ref} className={cx('!h-56 max-h-56 min-w-56 p-12 text-h2-md', className)} {...rest} />;
});

MegaButton.displayName = 'MegaButton';
