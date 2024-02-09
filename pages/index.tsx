import { useEffect, useState } from "react";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import ConnectorsInfo from "../components/ConnectorsInfo/ConnectorsInfo";
import Footer from "../components/Footer/Footer";
import GoogleAnalyticsScript from "../components/GoogleAnalyticsScript/GoogleAnalyticsScript";
import NewsEntry from "../components/NewsEntry/NewsEntry";
import { SelectOption } from "../components/SelectDropdown/SelectDropdown";
import TopNav from "../components/TopNav/TopNav";
import Card from "../components/common/Card/Card";
import HomePageBanner from "../components/common/HomePageBanner/HomePageBanner";
import SkeletonLoader from "../components/common/SkeletonLoader/SkeletonLoader";
import {
  BLOGS_INFO,
  OVERVIEW_INFO,
  QUICK_LINK_CARDS,
} from "../constants/homePage.constants";
import { useDocVersionContext } from "../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../context/RouteChangingContext";
import { SkeletonWidth } from "../enums/SkeletonLoder.enum";
import { MenuItem } from "../interface/common.interface";
import { getVersionsList } from "../lib/api";
import { fetchMenuList } from "../utils/CommonUtils";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

export default function Index({ versionsList }: Readonly<Props>) {
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
      <GoogleAnalyticsScript />
      <div className="nav-bar-container">
        <TopNav versionsList={versionsList} />
        <CategoriesNav menu={menu} />
      </div>
      <div className="home-page">
        {isRouteChanging ? (
          <div className="pt-20 px-32">
            <SkeletonLoader
              paragraph={{
                rows: 16,
                width: SkeletonWidth.FULL,
              }}
              title={SkeletonWidth.SMALL}
            />
          </div>
        ) : (
          <>
            <HomePageBanner />

            <div className="overview-container">
              <div className="overview-heading">{OVERVIEW_INFO.title}</div>
              <p className="m-0">{OVERVIEW_INFO.description}</p>
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
