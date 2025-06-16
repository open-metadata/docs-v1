import React, { ReactNode } from "react";
import { ReactComponent as Puzzle } from "../../../images/icons/puzzle.svg";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import styles from "./Card.module.css";
import { getUrl } from "../../../utils/CommonUtils";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import ParamLink from "../../ParamLink";
import { useRouter } from "next/router";

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
  const { enableVersion } = useDocVersionContext();
  const router = useRouter();
  return (
    <ParamLink
      className={styles.Container}
      href={getUrl({ url, docVersion: router.query.version as string ?? "latest", enableVersion, isExternalLink })}
    >
      {icon ? icon : <Puzzle />}
      <div className={styles.Heading}>{heading}</div>
      <p className="m-0 mb-5">{content}</p>
      <ArrowRight className={styles.ArrowIcon} />
    </ParamLink>
  );
}
