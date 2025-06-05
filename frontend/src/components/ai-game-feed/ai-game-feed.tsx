'use client';

import { ChatHistory, ChatHistoryEntry, OriginTitleMap } from '@sk-web-gui/ai';
import { useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { AIGameFeedEntry } from './ai-game-feed-entry';
import { AIGameFeedWrapper } from './ai-game-feed-wrapper';

export interface AIGameFeedProps extends React.ComponentPropsWithoutRef<'ul'> {
  history: ChatHistory;
  size?: 'sm' | 'lg';
  titles?: OriginTitleMap;
}

export const AIGameFeed = React.forwardRef<HTMLUListElement, AIGameFeedProps>((props, ref) => {
  const [lastMessage, setLastMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const [lastOwnMessage, setLastOwnMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const internalRef = React.useRef<HTMLUListElement>(null);
  const { history, className, size, titles, ...rest } = props;

  const assistantHistory = React.useMemo(() => history.filter((message) => message.origin !== 'user'), [history]);
  const userHistory = React.useMemo(() => history.filter((message) => message.origin === 'user'), [history]);

  React.useEffect(() => {
    const latest = assistantHistory.at(-1);

    if (latest?.done && latest.id !== lastMessage?.id) {
      setLastMessage(latest);
    }
    //eslint-disable-next-line
  }, [assistantHistory]);

  React.useEffect(() => {
    const latest = userHistory.at(-1);

    if (latest?.done && latest.id !== lastOwnMessage?.id) {
      setLastOwnMessage(latest);
    }
    //eslint-disable-next-line
  }, [userHistory]);

  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current.scrollTop = internalRef.current.scrollHeight;
    }
  }, [history]);

  const getBackgroundColor = (entry: ChatHistoryEntry) => {
    switch (entry.text) {
      case 'A':
        return 'vattjom';
      case 'B':
        return 'juniskar';
      case 'C':
        return 'gronsta';
      default:
        return 'bjornstigen';
    }
  };

  return (
    <>
      <AIGameFeedWrapper ref={useForkRef(ref, internalRef)} className={className} {...rest}>
        {history?.map((entry, index) => (
          <AIGameFeedEntry
            key={`${index}-${entry.id}`}
            entry={entry}
            size={size}
            background={entry.origin === 'user' ? getBackgroundColor(entry) : 'tertiary'}
            align={entry.origin === 'assistant' ? 'left' : 'right'}
            asButton={entry.origin === 'user' && ['A', 'B', 'C'].includes(entry.text)}
          ></AIGameFeedEntry>
        ))}
      </AIGameFeedWrapper>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
        {lastMessage && (
          <AIGameFeedEntry entry={lastMessage} title={titles?.[lastMessage.origin]?.title} tabbable={false} />
        )}
      </div>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
        {lastOwnMessage && (
          <AIGameFeedEntry entry={lastOwnMessage} title={titles?.[lastOwnMessage.origin]?.title} tabbable={false} />
        )}
      </div>
    </>
  );
});

AIGameFeed.displayName = 'AI GameFeed';
