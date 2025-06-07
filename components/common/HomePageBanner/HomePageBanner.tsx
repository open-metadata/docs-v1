import classNames from "classnames";
import { Fragment, useCallback } from "react";
import { HOME_PAGE_BANNER_VIDEO_ID } from "../../../constants/homePage.constants";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import { ReactComponent as ArrowRight } from "../../../images/icons/arrow-right.svg";
import { getUrl } from "../../../utils/CommonUtils";
import Button from "../Button/Button";
import YouTube from "../Youtube/Youtube";
import { HomePageBannerProps } from "./HomePageBanner.interface";
import styles from "./HomePageBanner.module.css";
import ParamLink from "../../ParamLink";

export default function HomePageBanner({
  quickLinks,
  bannerInfo,
}: Readonly<HomePageBannerProps>) {
  const { docVersion, enableVersion } = useDocVersionContext();

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
          <h1 className={styles.Heading}>{bannerInfo.title}</h1>
          <section className={styles.Divider} />
          <p className="text-xl text-center">{bannerInfo.description}</p>
        </div>
      </div>
      <div className={styles.Video}>
        <YouTube videoId={HOME_PAGE_BANNER_VIDEO_ID} />
      </div>
      <div className={styles.BannerNavLinkContainer}>
        {quickLinks.map(
          (
            { title, description, linkTitle, href, theme, externalURL },
            index
          ) => (
            <Fragment key={href}>
              <div className={styles.BannerNavLink}>
                <div>
                  <div className={styles.SubHeading}>{title}</div>
                  <p className={styles.DescriptionText}>{description}</p>
                </div>
                <ParamLink
                  href={getUrl({
                    url: href,
                    docVersion,
                    enableVersion,
                    isExternalLink: externalURL,
                  })}
                  target={externalURL ? "_blank" : "_self"}
                >
                  <Button
                    className={classNames(
                      styles.BannerNavButton,
                      getLinkButtonStyleFromTheme(theme)
                    )}
                    type="button"
                  >
                    <span className="font-semibold">{linkTitle}</span>
                    <span className="ml-2">
                      <ArrowRight />
                    </span>
                  </Button>
                </ParamLink>
              </div>
              {index < quickLinks.length - 1 && (
                <div className={styles.BannerNavLinkBorder} />
              )}
            </Fragment>
          )
        )}
      </div>
    </div>
  );
}
