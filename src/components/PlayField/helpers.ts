import { initialImages } from "../../constants/initialImages";
import { CardsMap } from "../../types/types";
import { shuffleArray } from "../../utils/array";

export const getCardsById = () => {
  const images = shuffleArray(initialImages.concat(initialImages));

  return images.reduce<CardsMap>((acc, imageUrl) => {
    const id = crypto.randomUUID();

    acc[id] = { id, imageUrl };

    return acc;
  }, {});
};
