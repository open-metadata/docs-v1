import { useEffect } from "react";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import ConnectorsInfo from "../../components/ConnectorsInfo/ConnectorsInfo";
import Footer from "../../components/Footer/Footer";
import NewsEntry from "../../components/NewsEntry/NewsEntry";
import { SelectOption } from "../../components/SelectDropdown/SelectDropdown";
import TopNav from "../../components/TopNav/TopNav";
import Card from "../../components/common/Card/Card";
import HomePageBanner from "../../components/common/HomePageBanner/HomePageBanner";
import SkeletonLoader from "../../components/common/SkeletonLoader/SkeletonLoader";
import {
  BANNER_LINKS_INFO,
  BLOGS_INFO,
  HOME_PAGE_BANNER_INFO,
  OVERVIEW_INFO,
  QUICK_LINK_CARDS,
} from "../../constants/homePage.constants";
import { DEFAULT_VERSION } from "../../constants/version.constants";
import { useMenuItemsContext } from "../../context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { getVersionsList } from "../../lib/api";
import { getMajorVersionMatch } from "../../utils/SlugUtils";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

export default function Index({ versionsList }: Readonly<Props>) {
  const { isRouteChanging } = useRouteChangingContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const { menuItems } = useMenuItemsContext();

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  return (
    <>
      <div className="nav-bar-container">
        <TopNav versionsList={versionsList} />
        <CategoriesNav menu={menuItems} />
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
            <HomePageBanner
              bannerInfo={HOME_PAGE_BANNER_INFO}
              quickLinks={BANNER_LINKS_INFO}
            />

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
              <ConnectorsInfo
                tabStyle="connector-tab"
                activeTabStyle="active-connector"
              />
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

export async function getServerSideProps(context) {
  try {
    const version = context.params.version as string;
    const slug = context.params.slug as string[];

    // If the version in the URL is the default version, change the path to /latest
    if (version === DEFAULT_VERSION) {
      return {
        redirect: {
          permanent: false,
          destination: `/latest`,
        },
      };
    }

    const versionsList: Array<SelectOption<string>> = getVersionsList();
    // Check if the version is present in the existing versions list
    const isVersionPresent = versionsList.some(
      (versionOption) => versionOption.value === version
    );

    if (!isVersionPresent) {
      // If the version is not present in versions list,
      // check if the major version is present.
      // Ex. If v1.4.8 is in the URL and v1.4.8 is not in versions list but v1.4.x is so match the 1.4
      // and redirect to the respective version URL in this case to v1.4.x
      const majorVersionMatch = getMajorVersionMatch(versionsList, version);

      return {
        redirect: {
          permanent: false,
          destination: `/${
            majorVersionMatch?.value ?? "latest" // If major version match is not present, redirect to latest
          }`,
        },
      };
    }

    return {
      props: { versionsList },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
