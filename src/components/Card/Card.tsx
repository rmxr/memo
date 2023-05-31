import styles from "./Card.module.css";
const back =
  "https://images.unsplash.com/photo-1550537687-c91072c4792d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

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
