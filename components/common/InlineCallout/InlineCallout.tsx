import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgCelebration } from "../../../images/icons/celebration.svg";
import { ReactComponent as SvgFitScreen } from "../../../images/icons/fitScreen.svg";
import { ReactComponent as SvgList } from "../../../images/icons/list.svg";
import {
  materialDesignIcon,
  getUrlWithVersion,
} from "../../../utils/CommonUtils";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import styles from "./InlineCallout.module.css";

interface InlineCalloutProps {
  icon: string;
  bold: string;
  href: string;
  isExternalLink: boolean;
  children: ReactNode;
}

const InlineCallout = ({
  children,
  icon,
  bold,
  href,
  isExternalLink = false,
}: InlineCalloutProps) => {
  const { docVersion } = useDocVersionContext();
  const [isOMWebsite, setIsOMWebsite] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOMWebsite(window.location.hostname.includes("docsv1"));
    }
  }, []);

  const iconComponent = useMemo(() => {
    switch (icon) {
      case "celebration":
        return <SvgCelebration />;
      case "fit_screen":
        return <SvgFitScreen />;
      default: {
        const getIcon = materialDesignIcon(icon);
        return getIcon ? getIcon({ size: 32 }) : <SvgList />;
      }
    }
  }, [icon]);

  return (
    <Link
      className={classNames(styles.Container)}
      href={isExternalLink ? href : getUrlWithVersion(href, docVersion)}
    >
      <span
        className={classNames(
          styles.IconContainer,
          isOMWebsite ? styles.OMBgColor : styles.CollateBgColor
        )}
      >
        {iconComponent}
      </span>
      <span className={styles.Text}>
        <span className={classNames(styles.Link)}>{bold}</span> {children}
      </span>
    </Link>
  );
};

export default InlineCallout;
