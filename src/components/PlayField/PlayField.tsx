import styles from "./PlayField.module.css";
import Card from "../Card/Card";
import React from "react";
import { initialImages } from "../../constants/initialImages";
import { CardsMap, IPlayingFieldItem } from "../../types/types";
import { shuffleArray } from "../../utils/array";

const images = shuffleArray([...initialImages, ...initialImages]);

const cardsById = images.reduce<CardsMap>((acc, url) => {
  const id = crypto.randomUUID();

  acc[id] = { id, url };

  return acc;
}, {});

const MAX_OPEN_CARDS = 2;
type CardId = IPlayingFieldItem["id"];

function PlayField() {
  const [openCardIds, setOpenCardIds] = React.useState<CardId[]>([]);
  const [switchedCardIds, setSwitchedCardIds] = React.useState<CardId[]>([]);

  const checkResult = React.useCallback(() => {
    if (openCardIds.length !== MAX_OPEN_CARDS) {
      return;
    }

    const сardOne = cardsById[openCardIds[0]];
    const сardTwo = cardsById[openCardIds[1]];

    if (сardOne.url === сardTwo.url) {
      setSwitchedCardIds(switchedCardIds.concat(openCardIds));
    }

    setOpenCardIds([]);
  }, [openCardIds, switchedCardIds]);

  React.useEffect(() => {
    setTimeout(checkResult, 1000);
  }, [checkResult]);

  const handleClick = (id: CardId) => {
    if (openCardIds.length < MAX_OPEN_CARDS && !openCardIds.includes(id)) {
      setOpenCardIds(openCardIds.concat(id));
    }
  };

  return (
    <div className={styles.container}>
      {Object.values(cardsById).map(({ id, url }) => {
        const clickHandler = () => {
          handleClick(id);
        };
        return (
          <Card
            flip={openCardIds.includes(id)}
            off={switchedCardIds.includes(id)}
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
