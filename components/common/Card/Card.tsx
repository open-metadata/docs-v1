import React, { ReactNode } from "react";
import { ReactComponent as Puzzle } from "../../../images/icons/puzzle.svg";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import styles from "./Card.module.css";
import Link from "next/link";

interface Props {
  heading: string;
  content: string;
  url: string;
}

export default function Card({ heading, content, url }: Props) {
  return (
    <div className={styles.Container}>
      <Puzzle />
      <div className={styles.Heading}>{heading}</div>
      <p>{content}</p>
      <Link href={url}>
        <ArrowRight className={styles.ArrowIcon} />
      </Link>
    </div>
  );
}
