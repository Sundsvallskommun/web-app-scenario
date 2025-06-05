'use client';

import { ChatHistoryEntry, MarkdownRendered, TypingSequence } from '@sk-web-gui/ai';
import { cx } from '@sk-web-gui/utils';
import { useLocalStorage } from '@utils/use-localstorage.hook';
import React from 'react';
import { MegaButton } from '../mega-button/mega-button.component';

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

export const AIGameFeedEntry = React.forwardRef<HTMLLIElement, AIGameFeedEntryProps>((props, ref) => {
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

  return (
    <>
      <li
        ref={ref}
        className={cx('w-full flex', align === 'left' ? 'flex-row' : 'flex-row-reverse', className)}
        data-origin={entry.origin}
        data-size={size}
        {...rest}
      >
        <div
          className={cx(
            (!done && !entry.text) || entry.origin === 'user' ? 'w-fit' : 'w-full',
            'rounded-cards px-24 py-20',
            asButton ? 'bg-transparent'
            : highcontrast ? 'bg-background-content text-dark-primary'
            : background === 'tertiary' ?
              'dark:bg-primitives-overlay-darken-8 bg-primitives-overlay-lighten-8 text-dark-primary'
            : background === 'vattjom' ? 'bg-vattjom-surface-primary text-vattjom-text-secondary'
            : background === 'juniskar' ? 'bg-juniskar-surface-primary text-juniskar-text-secondary'
            : background === 'gronsta' ? 'bg-gronsta-surface-primary text-gronsta-text-secondary'
            : background === 'bjornstigen' ? 'bg-bjornstigen-surface-primary text-bjornstigen-text-secondary'
            : 'bg-transparent',
            {
              ['font-bold']: asButton || (background && background !== 'tertiary'),
              ['border-2 border-divider']: highcontrast && !asButton && !!background,
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
            : asButton ?
              <MegaButton
                as="span"
                role="none"
                color={background === 'tertiary' ? 'primary' : background}
                rounded
                className="cursor-default"
              >
                <MarkdownRendered
                  text={entry.text}
                  messageId={entry.id}
                  hideElements={!entry.done}
                  tabbable={tabbable}
                />
              </MegaButton>
            : <>
                <MarkdownRendered
                  text={entry.text}
                  messageId={entry.id}
                  hideElements={!entry.done}
                  tabbable={tabbable}
                />
              </>
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
