import styles from "./PlayField.module.css";
import Card from "../Card/Card";
import React from "react";
import { initialImages } from "../../constants/initialImages";
import { IOpenCardsItem, IPlayingFieldItem } from "../../types/types";
import { shuffleArray } from "../../utils/array";

const images = shuffleArray([...initialImages, ...initialImages]);
const initialCards: IPlayingFieldItem[] = images.map((url) => {
  return {
    url,
    flip: false,
    off: false,
  };
});
const MAX_OPEN_CARDS = 2;

function PlayField() {
  const [openCards, setOpenCards] = React.useState<IOpenCardsItem[]>([]);
  const [cards, setCards] = React.useState<IPlayingFieldItem[]>(initialCards);
  const areBothCardsOpen = openCards.length === MAX_OPEN_CARDS;
  const checkResult = React.useCallback(() => {
    const [cardOne, cardTwo] = openCards;
    const newCards = [...cards];
    const newCardOne = newCards[cardOne.index];
    const newCardTwo = newCards[cardTwo.index];
    const isSuccess = cardOne.url === cardTwo.url;

    if (isSuccess) {
      newCardOne.off = true;
      newCardTwo.off = true;
    } else {
      newCardOne.flip = false;
      newCardTwo.flip = false;
    }

    setCards(newCards);
    setOpenCards([]);
  }, [cards, openCards]);
  React.useEffect(() => {
    setTimeout(() => {
      if (areBothCardsOpen) {
        checkResult();
      }
    }, 1000);
  }, [areBothCardsOpen, checkResult, openCards]);

  const handleClick = (index: number, url: string) => {
    if (areBothCardsOpen) {
      return;
    }
    const card = cards[index];
    if (card.flip) {
      return;
    }
    const newCards = [...cards];
    newCards[index] = { ...card, flip: true };
    setCards(newCards);
    if (openCards.length < MAX_OPEN_CARDS) {
      setOpenCards([...openCards, { index, url }]);
    }
  };

  return (
    <div className={styles.container}>
      {cards.map(({ url, flip, off }, index) => {
        const clickHandler = () => {
          handleClick(index, url);
        };
        return (
          <Card
            flip={flip}
            off={off}
            key={index}
            image={url}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
}

export default PlayField;
