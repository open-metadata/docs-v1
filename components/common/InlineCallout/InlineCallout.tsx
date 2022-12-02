import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgDocker } from "../../../images/icons/Docker.svg";
import { ReactComponent as SvgSecurity } from "../../../images/icons/bare_metal.svg";
import { ReactComponent as SvgKubernetes } from "../../../images/icons/kubernetes.svg";

import styles from "./InlineCallout.module.css";

const InlineCallout = ({ children, icon, bold, href }) => {
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
    <Link href={href}>
      <section className={classNames(styles.Container)}>
        <span className={classNames(styles.IconContainer)}>
          <span>{icon}</span>
        </span>
        <span className={styles.Text}>
          <span className={classNames(styles.Link)}>{bold}</span> {children}
        </span>
      </section>
    </Link>
  );
};

export default InlineCallout;
