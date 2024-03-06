import classNames from "classnames";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { ReactComponent as CollateIcon } from "../../../images/icons/ic-collate.svg";
import { ReactComponent as OpenMetadataIcon } from "../../../images/icons/om-monogram.svg";
import { generateIdFromHeading } from "../../../utils/CommonUtils";
import RoadMapModal from "../../modals/RoadMapModal/RoadMapModal";
import { RoadmapFeatureItemProps } from "./RoadmapFeatureItem.interface";
import styles from "./RoadmapFeatureItem.module.css";

function RoadmapFeatureItem({
  feature,
  color,
  category,
  release,
}: Readonly<RoadmapFeatureItemProps>) {
  const [show, setShow] = useState(false);

  const handleShowModal = useCallback(() => {
    setShow(true);
  }, []);

  const handleHideModal = useCallback(
    (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.stopPropagation();
      setShow(false);
    },
    []
  );

  const tooltipContent = useMemo(
    () => (
      <div className="block">
        <div className="text-base font-medium text-heading">
          {feature.label}
        </div>
        <div className="text-xs font-medium text-para-light">
          {feature.date}
        </div>
        {feature.description ? (
          <p className="mt-1 text-xs font-medium text-para-light">
            {feature.description.slice(0, 150)}...
          </p>
        ) : null}
      </div>
    ),
    [feature]
  );

  return (
    <div
      data-tooltip-id={generateIdFromHeading(feature.label)}
      className={styles.FeatureItem}
      role="button"
      onClick={handleShowModal}
    >
      <div className={classNames(color, styles.FeatureLeftBorder)}></div>
      <div className={styles.FeatureItemContent}>
        <div>{feature.label}</div>
        {feature.isCollate ? (
          <CollateIcon className={styles.PlatformIcon} width={16} />
        ) : (
          <OpenMetadataIcon className={styles.PlatformIcon} width={16} />
        )}
      </div>

      <Tooltip
        delayShow={300}
        className={classNames("w-full flex max-w-md z-50", styles.Tooltip)}
        variant="light"
        place="top"
        id={generateIdFromHeading(feature.label)}
      >
        {tooltipContent}
      </Tooltip>

      <RoadMapModal
        data={feature}
        onClose={handleHideModal}
        show={show}
        category={category}
        release={release}
      />
    </div>
  );
}

export default RoadmapFeatureItem;
