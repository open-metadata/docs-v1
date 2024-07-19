import classNames from "classnames";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useDocVersionContext } from "../../../../context/DocVersionContext";
import { getUrlWithVersion } from "../../../../utils/CommonUtils";
import { getTileIcons } from "../../../../utils/TileUtils";
import { TileProps } from "./Tile.interface";
import styles from "./Tile.module.css";

function Tile({
  description,
  link,
  title,
  isExternalLink = false,
  icon,
  children,
}: TileProps) {
  const { docVersion, enableVersion } = useDocVersionContext();

  const getWrappedTile = useCallback(
    (tileContainer: JSX.Element): JSX.Element =>
      link ? (
        <Link
          target={isExternalLink ? "_blank" : "_self"}
          href={
            isExternalLink
              ? link
              : enableVersion
              ? getUrlWithVersion(link, docVersion)
              : link
          }
        >
          {tileContainer}
        </Link>
      ) : (
        tileContainer
      ),
    [link, isExternalLink]
  );

  const tileIcon = useMemo(() => getTileIcons(icon), [icon]);

  return getWrappedTile(
    <div
      className={classNames(
        styles.Container,
        { [styles.WithIcon]: !isEmpty(icon) },
        link ? styles.HoverEffect : ""
      )}
    >
      {!isEmpty(icon) && <div className={styles.IconContainer}>{tileIcon}</div>}
      <div className={classNames(styles.InnerContainer)}>
        <h4>{title}</h4>
        {description && <span>{description}</span>}
        {children}
      </div>
    </div>
  );
}

export default Tile;
