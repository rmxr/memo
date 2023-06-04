import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
function Card({
  image,
  index,
  off,
  flip,
  clickHandler,
}: {
  image: string;
  index: number;
  off: boolean;
  flip: boolean;
  clickHandler: (index: number, url: string) => void;
}) {
  return (
    <div
      onClick={() => {
        clickHandler(index, image);
      }}
      className={`${styles.card} ${!flip ? styles.flipped : ""} ${
        off ? styles.off : ""
      }`}
    >
      <div className={styles.front}>
        <img className={styles.image} src={image} />
      </div>
      <div className={styles.back}>
        <img className={styles.image} src={back} />
      </div>
    </div>
  );
}

export default Card;
