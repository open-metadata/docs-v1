import classNames from "classnames";
import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { ReactComponent as HowToBGImage } from "../../images/icons/how-to-guide-bg.svg";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import Button from "../common/Button/Button";
import styles from "./HowToGuidesHeader.module.css";

function HowToGuidesHeader() {
  const { docVersion } = useDocVersionContext();

  return (
    <div className={styles.HowToGuidesHeaderContainer}>
      <HowToBGImage className={styles.BGImage} height="100%" width="100%" />
      <div
        className={classNames(
          "flex flex-col gap-4 non-collapsed-content mx-auto px-12 py-16"
        )}
      >
        <div>
          <div className={styles.Heading}>Documentation</div>
          <div className={styles.SubHeading}>
            Explore our how-to guides and a complete overview of the features in
            OpenMetadata.
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <Button
            className="flex gap-2"
            style={{
              padding: "8px 12px",
            }}
            type="link"
            href="/how-to-guides/openmetadata/data-discovery"
          >
            <span>Get Started</span>
            <MdOutlineArrowForwardIos size={10} />
          </Button>
          <Link
            className={styles.ExploreLink}
            href={getUrlWithVersion("/features", docVersion)}
          >
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowToGuidesHeader;
