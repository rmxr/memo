import React from "react";
import Card from "../Card/Card";
import { CardId } from "../../types/types";
import styles from "./PlayField.module.css";
import { getCardsById } from "./helpers";

const cardsById = getCardsById();
const MAX_OPEN_CARDS = 2;

function PlayField() {
  const [openCardIds, setOpenCardIds] = React.useState<CardId[]>([]);
  const [switchedCardIds, setSwitchedCardIds] = React.useState<CardId[]>([]);

  const checkResult = React.useCallback(() => {
    if (openCardIds.length !== MAX_OPEN_CARDS) {
      return;
    }

    const openCardOne = cardsById[openCardIds[0]];
    const openCardTwo = cardsById[openCardIds[1]];

    if (openCardOne.imageUrl === openCardTwo.imageUrl) {
      setSwitchedCardIds(switchedCardIds.concat(openCardIds));
    }

    setOpenCardIds([]);
  }, [openCardIds, switchedCardIds]);

  React.useEffect(() => {
    setTimeout(checkResult, 1000);
  }, [checkResult]);

  const handleClickCard = (id: CardId) => {
    if (openCardIds.length < MAX_OPEN_CARDS && !openCardIds.includes(id)) {
      setOpenCardIds(openCardIds.concat(id));
    }
  };

  return (
    <div className={styles.container}>
      {Object.values(cardsById).map(({ id, imageUrl }) => (
        <Card
          flip={openCardIds.includes(id)}
          off={switchedCardIds.includes(id)}
          key={id}
          imageUrl={imageUrl}
          onClick={() => {
            handleClickCard(id);
          }}
        />
      ))}
    </div>
  );
}

export default PlayField;
