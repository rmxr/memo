import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
function Card({
  imageUrl,
  off,
  flip,
  onClick,
}: {
  imageUrl: string;
  off: boolean;
  flip: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${flip ? styles.flipped : ""} ${
        off ? `${styles.off} ${styles.flipped}` : ""
      }`}
    >
      <div className={styles.front}>
        <img className={styles.image} src={imageUrl} />
      </div>
      <div className={styles.back}>
        <img className={styles.image} src={back} />
      </div>
    </div>
  );
}

export default Card;
