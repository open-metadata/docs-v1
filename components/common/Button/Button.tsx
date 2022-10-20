import classNames from "classnames";
import React, { HTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  href: string;
  type: "link" | "button";
}

export default function Button({
  children,
  className,
  href,
  id,
  onClick,
  type,
}: Props) {
  return type === "link" ? (
    <a className={classNames(styles.Container, className)} href={href} id={id}>
      {children}
    </a>
  ) : (
    <button
      className={classNames(styles.Container, className)}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
