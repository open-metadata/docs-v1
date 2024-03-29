import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { getUrlWithVersion } from "../../../utils/CommonUtils";
import styles from "./Button.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  href?: string;
  type: "link" | "button";
  isExternalLink?: boolean;
}

export default function Button({
  children,
  className,
  href,
  id,
  onClick,
  type,
  style,
  isExternalLink = false,
}: Props) {
  const { docVersion } = useDocVersionContext();

  return type === "link" ? (
    <a
      className={classNames(styles.Container, className)}
      href={isExternalLink ? href : getUrlWithVersion(href, docVersion)}
      id={id}
      style={style}
    >
      {children}
    </a>
  ) : (
    <button
      className={classNames(styles.Container, className)}
      id={id}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
