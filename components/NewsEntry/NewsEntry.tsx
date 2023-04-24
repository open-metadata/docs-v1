import Link from "next/link";
import styles from "./NewsEntry.module.css";

const NewsEntry = ({ title, text, link, image }) => {
  return (
    <Link className={styles.Container} href={link} target="_blank">
      <div className={styles.blogImage}>{image}</div>
      <div className={styles.blogContent}>
        <h4 className={styles.Title}>{title}</h4>
        <p className={styles.Text}>{text}</p>
      </div>
    </Link>
  );
};

export default NewsEntry;
