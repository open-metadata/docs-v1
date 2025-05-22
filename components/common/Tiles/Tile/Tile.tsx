import classNames from "classnames";
import { isEmpty } from "lodash";
import { useCallback, useMemo } from "react";
import { useDocVersionContext } from "../../../../context/DocVersionContext";
import { getUrl } from "../../../../utils/CommonUtils";
import { getTileIcons } from "../../../../utils/TileUtils";
import { TileProps } from "./Tile.interface";
import styles from "./Tile.module.css";
import ParamLink from "../../../ParamLink";

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
        <ParamLink
          target={isExternalLink ? "_blank" : "_self"}
          link={getUrl({ url: link, docVersion, enableVersion, isExternalLink })}
        >
          {tileContainer}
        </ParamLink>
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
