export interface IPlayingFieldItem {
  id: string;
  url: string;
  flip: boolean;
  off: boolean;
}

export type CardsMap = Record<string, IPlayingFieldItem>;
