import Link from "next/link";
import React, { ReactNode, useCallback } from "react";
import { getUrlWithVersion } from "../../../../utils/CommonUtils";
import styles from "./Tile.module.css";
import classNames from "classnames";

interface TileProps {
  description: string;
  link: string;
  title: string;
  isExternalLink?: boolean;
  children?: ReactNode;
}

function Tile({
  description,
  link,
  title,
  isExternalLink = false,
  children,
}: TileProps) {
  const getWrappedTile = useCallback(
    (tileContainer: JSX.Element): JSX.Element =>
      link ? (
        <Link
          target={isExternalLink ? "_blank" : "_self"}
          href={isExternalLink ? link : getUrlWithVersion(link)}
        >
          {tileContainer}
        </Link>
      ) : (
        tileContainer
      ),
    [link, isExternalLink]
  );

  return getWrappedTile(
    <div
      className={classNames(styles.Container, link ? styles.HoverEffect : "")}
    >
      <h4>{title}</h4>
      {description && <span>{description}</span>}
      {children}
    </div>
  );
}

export default Tile;
