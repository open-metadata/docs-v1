import Link from "next/link";
import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../../utils/CommonUtils";
import styles from "./Tile.module.css";

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
  return (
    <Link href={isExternalLink ? link : getUrlWithVersion(link)}>
      <div className={styles.Container}>
        <h4>{title}</h4>
        <span>{description}</span>
        {children}
      </div>
    </Link>
  );
}

export default Tile;
