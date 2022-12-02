import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./Tile.module.css";

interface TileProps {
  description: string;
  link: string;
  title: string;
}

function Tile({ description, link, title }: TileProps) {
  return (
    <Link legacyBehavior href={link}>
      <div className={styles.Container}>
        <h4>{title}</h4>
        <span>{description}</span>
      </div>
    </Link>
  );
}

export default Tile;
