import styles from "./PlayField.module.css";
import Card from "../Card/Card";
import React from "react";
import { initialImages } from "../../constants/initialImages";
import { CardsMap, IPlayingFieldItem } from "../../types/types";
import { shuffleArray } from "../../utils/array";

const images = shuffleArray([...initialImages, ...initialImages]);

const initialCardsById = images.reduce<CardsMap>((acc, url) => {
  const id = crypto.randomUUID();

  acc[id] = { id, url, flip: false, off: false };

  return acc;
}, {});
const MAX_OPEN_CARDS = 2;

function PlayField() {
  const [openCardIds, setOpenCardIds] = React.useState<
    IPlayingFieldItem["id"][]
  >([]);
  const [cardsById, setCardsById] = React.useState(initialCardsById);
  const areBothCardsOpen = openCardIds.length === MAX_OPEN_CARDS;
  const checkResult = React.useCallback(() => {
    const newCards = { ...cardsById };
    const newCardOne = newCards[openCardIds[0]];
    const newCardTwo = newCards[openCardIds[1]];
    const isSuccess = newCardOne.url === newCardTwo.url;

    if (isSuccess) {
      newCardOne.off = true;
      newCardTwo.off = true;
    } else {
      newCardOne.flip = false;
      newCardTwo.flip = false;
    }

    setCardsById(newCards);
    setOpenCardIds([]);
  }, [cardsById, openCardIds]);
  React.useEffect(() => {
    setTimeout(() => {
      if (areBothCardsOpen) {
        checkResult();
      }
    }, 1000);
  }, [areBothCardsOpen, checkResult, openCardIds]);

  const handleClick = (id: string) => {
    if (areBothCardsOpen) {
      return;
    }
    const card = cardsById[id];
    if (card.flip) {
      return;
    }
    const newCards = { ...cardsById };
    newCards[id].flip = true;
    setCardsById(newCards);
    if (openCardIds.length < MAX_OPEN_CARDS) {
      setOpenCardIds(openCardIds.concat(id));
    }
  };

  return (
    <div className={styles.container}>
      {Object.values(cardsById).map(({ id, url, flip, off }) => {
        const clickHandler = () => {
          handleClick(id);
        };
        return (
          <Card
            flip={flip}
            off={off}
            key={id}
            image={url}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
}

export default PlayField;
