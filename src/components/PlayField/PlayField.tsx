import styles from "./PlayField.module.css";
import Card from "../Card/Card";
import React from "react";
import { initialImages } from "../../constants/initialImages";
import { IOpenCardsItem, IPlayingFieldItem } from "../../types/types";
import { shuffleArray } from "../../utils/util";

function PlayField() {
  const [openCards, setOpenCards] = React.useState<IOpenCardsItem[]>([]);
  const [field, setField] = React.useState<IPlayingFieldItem[]>([]);
  const images = [...initialImages, ...initialImages];
  shuffleArray(images);
  React.useEffect(() => {
    const newField = images.map((image) => {
      return {
        url: image,
        flip: false,
        off: false,
      };
    });
    setField(newField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCards = React.useCallback(() => {
    if (openCards.length == 2) {
      if (openCards[0].url === openCards[1].url) {
        const newField = [...field];
        newField[openCards[0].index] = {
          ...field[openCards[0].index],
          off: true,
        };
        newField[openCards[1].index] = {
          ...field[openCards[1].index],
          off: true,
        };
        setField(newField);
        setOpenCards([]);
      } else {
        const newField = [...field];
        newField[openCards[0].index] = {
          ...field[openCards[0].index],
          flip: false,
        };
        newField[openCards[1].index] = {
          ...field[openCards[1].index],
          flip: false,
        };
        setField(newField);
        setOpenCards([]);
      }
    }
    return;
  }, [field, openCards]);
  React.useEffect(() => {
    setTimeout(() => {
      handleCards();
    }, 1000);
  }, [handleCards, openCards]);

  const handleClick = (index: number, url: string) => {
    if (openCards.length == 2) {
      return;
    }
    const newField = [...field];
    newField[index] = { ...field[index], flip: true };
    setField(newField);
    if (openCards.length == 0 || openCards[0].index !== index) {
      const newOpenCards = [...openCards];
      newOpenCards.push({ index: index, url: url });
      setOpenCards(newOpenCards);
    }
  };

  return (
    <div className={styles.container}>
      {field &&
        field.map(({ url, flip, off }, index) => (
          <Card
            flip={flip}
            off={off}
            index={index}
            key={index}
            image={url}
            clickHandler={handleClick}
          />
        ))}
    </div>
  );
}

export default PlayField;