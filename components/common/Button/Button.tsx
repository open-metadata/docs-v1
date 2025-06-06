import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { getUrl } from "../../../utils/CommonUtils";
import styles from "./Button.module.css";
import ParamLink from "../../ParamLink";

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
  const { docVersion, enableVersion } = useDocVersionContext();

  return type === "link" ? (
    <ParamLink
      className={classNames(styles.Container, className)}
      href={getUrl({ url: href, docVersion, enableVersion, isExternalLink })}
      id={id}
      style={style}
    >
      {children}
    </ParamLink>
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
