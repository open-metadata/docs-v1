import classNames from "classnames";
import { ReactComponent as SvgCelebration } from "../../../images/icons/celebration.svg";
import { ReactComponent as SvgFitScreen } from "../../../images/icons/fitScreen.svg";
import { ReactComponent as SvgList } from "../../../images/icons/list.svg";
import { materialDesignIcon, getUrl } from "../../../utils/CommonUtils";
import { ReactNode, useMemo } from "react";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import styles from "./InlineCallout.module.css";
import ParamLink from "../../ParamLink";
import { useRouter } from "next/router";

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
  const { enableVersion } = useDocVersionContext();
  const router = useRouter();
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
    <ParamLink
      className={classNames(styles.Container)}
      href={getUrl({ url: href, docVersion: router.query.version as string ?? "latest", enableVersion, isExternalLink })}
      target={isExternalLink ? "_blank" : "_self"}
    >
      <span className={classNames(styles.IconContainer)}>{iconComponent}</span>
      <span className={styles.Text}>
        <span className={classNames(styles.Link)}>{bold}</span> {children}
      </span>
    </ParamLink>
  );
};

export default InlineCallout;
