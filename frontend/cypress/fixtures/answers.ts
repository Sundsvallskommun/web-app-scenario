import base from './scenario-base.json';

export const answer = (text: string) => {
  return { ...base, answer: `**Du frågade:** ${text}` };
};
