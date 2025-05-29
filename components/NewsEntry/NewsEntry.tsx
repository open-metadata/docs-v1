import styles from "./NewsEntry.module.css";
import { ReactNode } from "react";
import Image from "next/image";
import { isEmpty } from "lodash";
import ParamLink from "../ParamLink";

interface NewsEntryProps {
  title?: string;
  text?: string;
  link?: string;
  image?: string;
  children?: ReactNode;
}

const NewsEntry = ({ title, text, link, image, children }: NewsEntryProps) => {
  return (
    <ParamLink className={styles.Container} href={link} target="_blank">
      {!isEmpty(image) && (
        <Image
          src={image}
          alt={title}
          width={1000}
          height={1000}
          className={styles.blogImage}
        />
      )}
      <div className={styles.blogContent}>
        <h2 className={styles.Title}>{title}</h2>
        <p className={styles.Text}>{text}</p>
      </div>
      <div>{children}</div>
    </ParamLink>
  );
};

export default NewsEntry;
