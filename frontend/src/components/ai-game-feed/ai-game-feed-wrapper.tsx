'use client';

import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const AIGameFeedWrapper = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <ul
      ref={ref}
      role="log"
      aria-live="off"
      className={cx('sk-ai-feed', className)}
      {...rest}
    />
  );
});

AIGameFeedWrapper.displayName = 'AI GameFeed Wrapper';

export default AIGameFeedWrapper;
