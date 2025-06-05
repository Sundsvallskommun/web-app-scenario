'use client';

import { ChatHistoryEntry, TypingSequence } from '@sk-web-gui/ai';
import { cx } from '@sk-web-gui/utils';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import React from 'react';
import { AIGameFeedEntryTextComponent } from './ai-game-feed-entry-text';

interface AIGameFeedEntryProps extends React.ComponentPropsWithoutRef<'li'> {
  entry: ChatHistoryEntry;
  loadingMessage?: string;
  align?: 'left' | 'right';
  loadingComponent?: React.ReactNode;
  background?: 'tertiary' | 'vattjom' | 'juniskar' | 'gronsta' | 'bjornstigen';
  asButton?: boolean;
  /**
   * @default true
   */
  tabbable?: boolean;
  size?: 'sm' | 'lg';
}

export const AIGameFeedEntry = React.forwardRef<
  HTMLLIElement,
  AIGameFeedEntryProps
>((props, ref) => {
  const {
    entry,
    className,
    loadingMessage = 'Inväntar svar',
    tabbable,
    size,
    background,
    align = 'left',
    loadingComponent = <TypingSequence />,
    asButton = false,
    ...rest
  } = props;
  const { done } = entry;
  const [loading, setLoading] = React.useState<boolean>(false);
  const timeout = React.useRef(setTimeout(() => {}));

  const highcontrast = useLocalStorage((state) => state.highcontrast);
  React.useEffect(() => {
    if (!done) {
      timeout.current = setTimeout(() => {
        setLoading(true);
      }, 3500);
    } else {
      clearTimeout(timeout.current);
      setLoading(false);
    }
  }, [done]);

  const getBackgroundColor = () => {
    if (asButton) {
      return 'bg-transparent';
    }
    if (highcontrast) {
      return 'bg-background-content text-dark-primary';
    }

    switch (background) {
      case 'tertiary':
        return 'dark:bg-primitives-overlay-darken-8 bg-primitives-overlay-lighten-8 text-dark-primary';
      case 'vattjom':
        return 'bg-vattjom-surface-primary text-vattjom-text-secondary';
      case 'juniskar':
        return 'bg-juniskar-surface-primary text-juniskar-text-secondary';
      case 'gronsta':
        return 'bg-gronsta-surface-primary text-gronsta-text-secondary';
      case 'bjornstigen':
        return 'bg-bjornstigen-surface-primary text-bjornstigen-text-secondary';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <>
      <li
        ref={ref}
        className={cx(
          'w-full flex',
          align === 'left' ? 'flex-row' : 'flex-row-reverse',
          className
        )}
        data-origin={entry.origin}
        data-size={size}
        {...rest}
      >
        <div
          className={cx(
            (!done && !entry.text) || entry.origin === 'user' ?
              'w-fit'
            : 'w-full',
            'rounded-cards px-24 py-20',
            getBackgroundColor(),
            {
              ['font-bold']:
                asButton || (background && background !== 'tertiary'),
              ['border-2 border-divider']:
                highcontrast && !asButton && !!background,
            }
          )}
        >
          <div
            className={cx('sk-ai-feed-entry-content', {
              ['pb-8']: !!entry.text && entry.origin !== 'user',
            })}
          >
            {!done && !entry.text ?
              <>{loadingComponent}</>
            : <AIGameFeedEntryTextComponent
                entry={entry}
                asButton={asButton}
                background={background}
                tabbable={tabbable}
              />
            }
          </div>
        </div>
      </li>
      <span className="sk-ai-feed-live-wrapper" aria-live="polite">
        {loading && !done && loadingMessage}
      </span>
    </>
  );
});

AIGameFeedEntry.displayName = 'AI GameFeed Entry';
