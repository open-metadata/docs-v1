import Link from "next/link";
import { useEffect } from "react";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import ConnectorsInfo from "../../components/ConnectorsInfo/ConnectorsInfo";
import Footer from "../../components/Footer/Footer";
import GoogleAnalytics from "../../components/GoogleAnalytics/GoogleAnalytics";
import NewsEntry from "../../components/NewsEntry/NewsEntry";
import { SelectOption } from "../../components/SelectDropdown/SelectDropdown";
import TopNav from "../../components/TopNav/TopNav";
import bannerStyles from "../../components/common/Banner/Banner.module.css";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";
import SkeletonLoader from "../../components/common/SkeletonLoader/SkeletonLoader";
import YouTube from "../../components/common/Youtube/Youtube";
import {
  BANNER_LINKS_INFO,
  BLOGS_INFO,
  HOME_PAGE_BANNER_INFO,
  OVERVIEW_INFO,
  QUICK_LINK_CARDS,
} from "../../constants/homePage.constants";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useMenuItemsContext } from "../../context/MenuItemsContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import { SkeletonWidth } from "../../enums/SkeletonLoder.enum";
import { ReactComponent as ArrowRight } from "../../images/icons/arrow-right.svg";
import { getVersionsList } from "../../lib/api";
import { getUrlWithVersion } from "../../utils/CommonUtils";

interface Props {
  versionsList: Array<SelectOption<string>>;
}

export default function Index({ versionsList }: Readonly<Props>) {
  const { isRouteChanging } = useRouteChangingContext();
  const { docVersion } = useDocVersionContext();
  const { isMobileDevice } = useNavBarCollapsedContext();
  const { menuItems } = useMenuItemsContext();

  useEffect(() => {
    if (isMobileDevice) {
      document.body.classList.add("min-width-600");
    }
  }, [isMobileDevice]);

  return (
    <>
      <GoogleAnalytics />
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
            <div className={bannerStyles.Container}>
              <div className={bannerStyles.Content}>
                <div className="mb-8">
                  <div className={bannerStyles.Heading}>
                    {HOME_PAGE_BANNER_INFO.title}
                  </div>
                  <section className={bannerStyles.Divider} />
                  <p className="text-xl">{HOME_PAGE_BANNER_INFO.description}</p>
                </div>
                <div className="flex gap-8">
                  {BANNER_LINKS_INFO.map(
                    ({ title, description, linkTitle, href }) => (
                      <div key={href}>
                        <div className={bannerStyles.SubHeading}>{title}</div>
                        <p className="tw-lg">{description}</p>
                        <Link href={getUrlWithVersion(href, docVersion)}>
                          <Button className="mt-4" type="button">
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
              <div className={bannerStyles.Video}>
                <YouTube videoId="ld43_jafL9w" start="0:00" end="6:48" />
              </div>
            </div>

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

export async function getServerSideProps(context) {
  try {
    // Check if the version field passed in context params is proper version format
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
