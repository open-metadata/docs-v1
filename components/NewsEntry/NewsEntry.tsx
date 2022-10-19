import styles from "./NewsEntry.module.css";

const NewsEntry = ({ title, text, link, image }) => {
  return (
    <article className={styles.Container}>
      <div className={styles.blogImage}>{image}</div>
      <div className={styles.blogContent}>
        <a href={link}>
          <h4 className={styles.Title}>{title}</h4>
        </a>
        <p className={styles.Text}>{text}</p>
        <a href={link} className={styles.Link}>
          Read More
        </a>
      </div>
    </article>
  );
};

export default NewsEntry;
