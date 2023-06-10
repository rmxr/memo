export interface IPlayingFieldItem {
  id: ReturnType<Crypto["randomUUID"]>;
  imageUrl: string;
}

export type CardId = IPlayingFieldItem["id"];

export type CardsMap = Record<CardId, IPlayingFieldItem>;
