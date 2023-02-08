import React, { ReactNode } from "react";
import { ReactComponent as Puzzle } from "../../../images/icons/puzzle.svg";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import styles from "./Card.module.css";
import Link from "next/link";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

interface Props {
  heading: string;
  content: string;
  url: string;
  isExternalLink?: boolean;
}

export default function Card({
  heading,
  content,
  url,
  isExternalLink = false,
}: Props) {
  return (
    <div className={styles.Container}>
      <Puzzle />
      <div className={styles.Heading}>{heading}</div>
      <p className="m-0 mb-5">{content}</p>
      <Link href={isExternalLink ? url : getUrlWithVersion(url)}>
        <ArrowRight className={styles.ArrowIcon} />
      </Link>
    </div>
  );
}
