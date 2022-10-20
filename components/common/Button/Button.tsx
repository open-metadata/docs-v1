import classNames from "classnames";
import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
