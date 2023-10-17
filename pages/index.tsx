import React, { useEffect, useState } from "react";
import Card from "../components/common/Card/Card";
import ConnectorsInfo from "../components/ConnectorsInfo/ConnectorsInfo";
import bannerStyles from "../components/common/Banner/Banner.module.css";
import YouTube from "../components/common/Youtube/Youtube";
import NewsEntry from "../components/NewsEntry/NewsEntry";
import Button from "../components/common/Button/Button";
import { ReactComponent as ArrowRight } from "../images/icons/arrow-right.svg";
import TopNav from "../components/TopNav/TopNav";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import Footer from "../components/Footer/Footer";
import { fetchMenuList, getUrlWithVersion } from "../utils/CommonUtils";
import { BLOGS_INFO, QUICK_LINK_CARDS } from "../constants/homePage.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { MenuItem } from "../interface/common.interface";
import { useRouteChangingContext } from "../context/RouteChangingContext";
import SkeletonLoader from "../components/common/SkeletonLoader/SkeletonLoader";
import { SkeletonWidth } from "../enums/SkeletonLoder.enum";
import { SelectOption } from "../components/SelectDropdown/SelectDropdown";
import { getVersionsList } from "../lib/api";
import { useNavBarCollapsedContext } from "../context/NavBarCollapseContext";
import Link from "next/link";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

export default function Index({ versionsList }: Props) {
  const { docVersion } = useDocVersionContext();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  const fetchMenuItems = async (docVersion: string) => {
    const res = await fetchMenuList(docVersion);
    setMenu(res);
  };

  useEffect(() => {
    fetchMenuItems(docVersion);
  }, [docVersion]);

  return (
    <>
      <div className="nav-bar-container">
        <TopNav versionsList={versionsList} />
        <CategoriesNav menu={menu} />
      </div>
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
                  <Link href={getUrlWithVersion("quick-start", docVersion)}>
                    <Button type="button" className="mt-4">
                      Get Started
                      <span className="ml-2">
                        <ArrowRight />
                      </span>
                    </Button>
                  </Link>
                </>
              </div>
              <div className={bannerStyles.Video}>
                <YouTube videoId="ld43_jafL9w" />
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
              <div className="blogs-container">
                {BLOGS_INFO.map((cardInfo) => (
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

export async function getServerSideProps() {
  try {
    const versionsList: Array<SelectOption<string>> = getVersionsList();

    return {
      props: { versionsList },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
