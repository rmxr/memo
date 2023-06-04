import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
function Card({
  image,
  off,
  flip,
  clickHandler,
}: {
  image: string;
  off: boolean;
  flip: boolean;
  clickHandler: () => void;
}) {
  return (
    <div
      onClick={clickHandler}
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
