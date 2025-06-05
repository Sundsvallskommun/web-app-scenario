'use client';

import { MegaButton } from '@components/mega-button/mega-button.component';
import { ChatHistoryEntry, MarkdownRendered } from '@sk-web-gui/ai';

interface AIGameFeedEntryTextComponentProps {
  entry: ChatHistoryEntry;
  background?: 'tertiary' | 'vattjom' | 'juniskar' | 'gronsta' | 'bjornstigen';
  asButton?: boolean;
  tabbable?: boolean;
}

export const AIGameFeedEntryTextComponent: React.FC<
  AIGameFeedEntryTextComponentProps
> = ({ entry, asButton, background, tabbable }) => {
  return asButton ?
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
    : <MarkdownRendered
        text={entry.text}
        messageId={entry.id}
        hideElements={!entry.done}
        tabbable={tabbable}
      />;
};
