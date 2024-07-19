import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgCelebration } from "../../../images/icons/celebration.svg";
import { ReactComponent as SvgFitScreen } from "../../../images/icons/fitScreen.svg";
import { ReactComponent as SvgList } from "../../../images/icons/list.svg";
import {
  materialDesignIcon,
  getUrlWithVersion,
} from "../../../utils/CommonUtils";
import { ReactNode, useMemo } from "react";
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
  const { docVersion, enableVersion } = useDocVersionContext();

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
      href={
        isExternalLink
          ? href
          : enableVersion
          ? getUrlWithVersion(href, docVersion)
          : href
      }
    >
      <span className={classNames(styles.IconContainer)}>{iconComponent}</span>
      <span className={styles.Text}>
        <span className={classNames(styles.Link)}>{bold}</span> {children}
      </span>
    </Link>
  );
};

export default InlineCallout;
