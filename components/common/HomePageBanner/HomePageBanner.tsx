import classNames from "classnames";
import Link from "next/link";
import { useCallback } from "react";
import {
  BANNER_LINKS_INFO,
  HOME_PAGE_BANNER_INFO,
} from "../../../constants/homePage.constants";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import { getUrlWithVersion } from "../../../utils/CommonUtils";
import Button from "../Button/Button";
import YouTube from "../Youtube/Youtube";
import styles from "./HomePageBanner.module.css";

export default function HomePageBanner() {
  const { docVersion } = useDocVersionContext();

  const getLinkButtonStyleFromTheme = useCallback(
    (theme: string) => {
      switch (theme) {
        case "green":
          return styles.GreenButton;
        case "purple":
          return styles.PurpleButton;
        case "pink":
          return styles.PinkButton;
        default:
          return "";
      }
    },
    [styles]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className="mb-8 flex flex-col items-center">
          <div className={styles.Heading}>{HOME_PAGE_BANNER_INFO.title}</div>
          <section className={styles.Divider} />
          <p className="text-xl text-center">
            {HOME_PAGE_BANNER_INFO.description}
          </p>
        </div>
      </div>
      <div className={styles.Video}>
        <YouTube videoId="Mu7eq6OVtxk" />
      </div>
      <div className={styles.BannerNavLinkContainer}>
        {BANNER_LINKS_INFO.map(
          (
            { title, description, linkTitle, href, theme, externalURL },
            index
          ) => (
            <div
              className={classNames(styles.BannerNavLink, {
                [styles.BannerNavLinkBorder]: index !== 0,
              })}
              key={href}
            >
              <div>
                <div className={styles.SubHeading}>{title}</div>
                <p className={styles.DescriptionText}>{description}</p>
              </div>
              <Link
                href={externalURL ? href : getUrlWithVersion(href, docVersion)}
                target={externalURL ? "_blank" : "_self"}
              >
                <Button
                  className={classNames(
                    styles.BannerNavButton,
                    getLinkButtonStyleFromTheme(theme)
                  )}
                  type="button"
                >
                  <span>{linkTitle}</span>
                  <span className="ml-2">
                    <ArrowRight />
                  </span>
                </Button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
