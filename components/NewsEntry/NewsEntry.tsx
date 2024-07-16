import Link from "next/link";
import styles from "./NewsEntry.module.css";
import { ReactNode } from "react";
import Image from "next/image";

interface NewsEntryProps {
  title?: string;
  text?: string;
  link?: string;
  image?: string;
  children?: ReactNode;
}

const NewsEntry = ({ title, text, link, image, children }: NewsEntryProps) => {
  return (
    <Link className={styles.Container} href={link} target="_blank">
      {image && (
        <Image
          src={image}
          alt={title}
          width={1000}
          height={1000}
          className={styles.blogImage}
        />
      )}
      <div className={styles.blogContent}>
        <h4 className={styles.Title}>{title}</h4>
        <p className={styles.Text}>{text}</p>
      </div>
      <div>{children}</div>
    </Link>
  );
};

export default NewsEntry;
