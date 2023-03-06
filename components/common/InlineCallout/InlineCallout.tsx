import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgDocker } from "../../../images/icons/Docker.svg";
import { ReactComponent as SvgSecurity } from "../../../images/icons/bare_metal.svg";
import { ReactComponent as SvgKubernetes } from "../../../images/icons/kubernetes.svg";

import styles from "./InlineCallout.module.css";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

const InlineCallout = ({
  children,
  icon,
  bold,
  href,
  isExternalLink = false,
}) => {
  switch (icon) {
    case "celebration":
      icon = <SvgDocker />;
      break;
    case "storage":
      icon = <SvgSecurity />;
      break;
    case "fit_screen":
      icon = <SvgKubernetes />;
      break;
    default:
      icon = <SvgDocker />;
  }

  return (
    <Link
      className={classNames(styles.Container)}
      href={isExternalLink ? href : getUrlWithVersion(href)}
    >
      <span className={classNames(styles.IconContainer)}>
        <span>{icon}</span>
      </span>
      <span className={styles.Text}>
        <span className={classNames(styles.Link)}>{bold}</span> {children}
      </span>
    </Link>
  );
};

export default InlineCallout;
