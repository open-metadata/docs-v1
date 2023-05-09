import React, { ReactNode } from "react";
import { ReactComponent as Puzzle } from "../../../images/icons/puzzle.svg";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import styles from "./Card.module.css";
import Link from "next/link";
import { getUrlWithVersion } from "../../../utils/CommonUtils";
import { useDocVersionContext } from "../../../context/DocVersionContext";

interface Props {
  heading: string;
  content: string;
  url: string;
  isExternalLink?: boolean;
  icon?: ReactNode;
}

export default function Card({
  heading,
  content,
  url,
  isExternalLink = false,
  icon,
}: Props) {
  const { docVersion } = useDocVersionContext();

  return (
    <Link
      className={styles.Container}
      href={isExternalLink ? url : getUrlWithVersion(url, docVersion)}
    >
      {icon ? icon : <Puzzle />}
      <div className={styles.Heading}>{heading}</div>
      <p className="m-0 mb-5">{content}</p>
      <ArrowRight className={styles.ArrowIcon} />
    </Link>
  );
}
