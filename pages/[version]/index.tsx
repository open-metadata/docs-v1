import React from "react";
import Card from "../../components/common/Card/Card";
import ConnectorsInfo from "../../components/ConnectorsInfo/ConnectorsInfo";
import bannerStyles from "../../components/common/Banner/Banner.module.css";
import YouTube from "../../components/common/Youtube/Youtube";
import NewsEntry from "../../components/NewsEntry/NewsEntry";
import Button from "../../components/common/Button/Button";
import { ReactComponent as ArrowRight } from "../../images/icons/arrow-right.svg";
import TopNav from "../../components/TopNav/TopNav";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import { getMenu } from "../../lib/api";
import Footer from "../../components/Footer/Footer";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import {
  NEWS_ENTRY_INFO,
  QUICK_LINK_CARDS,
} from "../../constants/homePage.constants";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import SkeletonLoader from "../../components/common/SkeletonLoader/SkeletonLoader";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { useDocVersionContext } from "../../context/DocVersionContext";

export default function Index({ menu }) {
  const { isRouteChanging } = useRouteChangingContext();
  const { docVersion } = useDocVersionContext();

  return (
    <>
      <TopNav />
      <CategoriesNav menu={menu} />
      <div className="home-page">
        {isRouteChanging ? (
          <div className="m-36">
            <SkeletonLoader
              paragraph={{
                rows: 12,
                width: SkeletonWidth.DEFAULT,
              }}
              title={SkeletonWidth.SMALL}
            />
          </div>
        ) : (
          <>
            <div className={bannerStyles.Container}>
              <div className={bannerStyles.Content}>
                <div className="mb-8">
                  <div className={bannerStyles.Heading}>
                    OpenMetadata Documentation
                  </div>
                  <section className={bannerStyles.Divider} />
                  <p className="text-xl">
                    Unlock the value of data assets with an end-to-end metadata
                    management solution that includes data discovery,
                    governance, data quality, observability, and people
                    collaboration.
                  </p>
                </div>
                <>
                  <div className={bannerStyles.SubHeading}>Quick Start</div>
                  <p className="tw-lg">
                    Get to know OpenMetadata in few minutes. Watch the data
                    discovery, data profiler, and lineage features in action
                  </p>
                  <Button
                    className="mt-4"
                    href={getUrlWithVersion("/quick-start", docVersion)}
                    type="link"
                  >
                    Get Started
                    <span className="ml-2">
                      <ArrowRight />
                    </span>
                  </Button>
                </>
              </div>
              <div className={bannerStyles.Video}>
                <YouTube videoId="ld43_jafL9w" start="0:00" end="6:48" />
              </div>
            </div>
            <div className="overview-container">
              <div className="overview-heading">Overview</div>
              <p className="m-0">
                OpenMetadata enables metadata management end-to-end, giving you
                the ability to unlock the value of data assets in the common use
                cases of data discovery and governance, but also in emerging use
                cases related to data quality, observability, and people
                collaboration.
              </p>
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Quick Links</div>
              <div className="cards-container">
                {QUICK_LINK_CARDS.map((cardInfo) => (
                  <Card
                    content={cardInfo.content}
                    key={`${cardInfo.heading}${cardInfo.url}`}
                    heading={cardInfo.heading}
                    url={cardInfo.url}
                    isExternalLink={cardInfo.isExternalLink}
                    icon={cardInfo.icon}
                  />
                ))}
              </div>
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Connectors</div>
              <ConnectorsInfo />
            </div>
            <div className="homepage-containers">
              <div className="container-heading">Blogs</div>
              <div className="flex justify-between">
                {NEWS_ENTRY_INFO.map((cardInfo) => (
                  <NewsEntry
                    image={cardInfo.image}
                    key={`${cardInfo.title}${cardInfo.link}`}
                    link={cardInfo.link}
                    title={cardInfo.title}
                    text={cardInfo.text}
                  />
                ))}
              </div>
            </div>
            <div className="mt-20" />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Check if the version field passed in context params is proper version format
    const versionFormat = /(v\d\.*\d*)/g;
    const isVersionPresent = versionFormat.test(context.params.version);
    let menu = [];

    if (isVersionPresent) {
      menu = getMenu(context.params.version);
    }
    return {
      props: { menu },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
