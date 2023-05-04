import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgCelebration } from "../../../images/icons/celebration.svg";
import { ReactComponent as SvgFitScreen } from "../../../images/icons/fitScreen.svg";
import styles from "./InlineCallout.module.css";
import { getUrlWithVersion } from "../../../utils/CommonUtils";
import Icon from "@mui/material/Icon";
import { ReactNode, useMemo } from "react";

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
  const iconComponent = useMemo(() => {
    switch (icon) {
      case "celebration":
        return <SvgCelebration />;
      case "fit_screen":
        return <SvgFitScreen />;
      default:
        return (
          <Icon
            style={{
              fontSize: "32px",
            }}
          >
            {icon}
          </Icon>
        );
    }
  }, [icon]);

  return (
    <Link
      className={classNames(styles.Container)}
      href={isExternalLink ? href : getUrlWithVersion(href)}
    >
      <span className={classNames(styles.IconContainer)}>{iconComponent}</span>
      <span className={styles.Text}>
        <span className={classNames(styles.Link)}>{bold}</span> {children}
      </span>
    </Link>
  );
};

export default InlineCallout;
