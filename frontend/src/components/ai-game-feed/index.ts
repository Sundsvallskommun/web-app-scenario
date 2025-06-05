import { AIGameFeedEntry } from "./ai-game-feed-entry";
import { AIGameFeedWrapper } from "./ai-game-feed-wrapper";
import {
  AIGameFeed as AIFeedComponent,
  AIGameFeedProps as AIFeedComponentProps,
} from "./ai-game-feed";

interface AIFeedProps
  extends React.ForwardRefExoticComponent<AIFeedComponentProps> {
  Entry: typeof AIGameFeedEntry;
  Wrapper: typeof AIGameFeedWrapper;
}

export const AIGameFeed = {
  ...AIFeedComponent,
  Entry: AIGameFeedEntry,
  Wrapper: AIGameFeedWrapper,
} as AIFeedProps;

export type { AIFeedProps };
