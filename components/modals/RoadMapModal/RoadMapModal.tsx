import classNames from "classnames";
import { MouseEvent, useCallback, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CollateIcon } from "../../../images/icons/ic-collate.svg";
import { ReactComponent as OpenMetadataIcon } from "../../../images/icons/om-monogram.svg";
import styles from "./RoadMapModal.module.css";

export const RoadMapModal = ({ data, category, onClose, show, release }) => {
  const { label, description, date } = data;
  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );

  const handleModalBodyClick = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" role="button" onClick={onClose}>
        <div
          className="modal-content"
          role="button"
          onClick={handleModalBodyClick}
        >
          <div
            className={classNames("modal-header", styles.RoadmapModalHeader)}
          >
            <div className="flex items-center gap-4">
              <h2 className="modal-title font-medium text-lg">{label}</h2>
              {data.isCollate ? (
                <CollateIcon className={styles.PlatformIcon} width={24} />
              ) : (
                <OpenMetadataIcon className={styles.PlatformIcon} width={24} />
              )}
            </div>

            <button onClick={onClose} className="button">
              <MdClose color="gray" size={24} />
            </button>
          </div>
          <div className="h-full grid grid-cols-12 bg-white">
            {/* Left Panel */}
            <div className="col-span-8 p-4 h-full">
              <p className={styles.LeftPanelInfoHeader}>Description</p>
              <p className={styles.LeftPanelInfoData}>{description}</p>
            </div>

            {/* Right panel */}
            <div className={classNames("col-span-4 p-3", styles.RightPanel)}>
              <p className={styles.RightPanelInfoHeader}>Date</p>

              <p className={styles.RightPanelInfoData}>{date}</p>

              <p className={styles.RightPanelInfoHeader}>
                Collate SaaS Roadmap
              </p>

              <p className={styles.RightPanelInfoData}>{category}</p>

              <p className={styles.RightPanelInfoHeader}>Collate Releases</p>

              <p className={styles.RightPanelInfoData}>Release {release}</p>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default RoadMapModal;
