import { Uuid } from "./misc";

export type CardId = Uuid;

export interface IPlayingFieldItem {
  id: CardId;
  imageUrl: string;
}

export type CardsMap = Record<Uuid, IPlayingFieldItem>;
