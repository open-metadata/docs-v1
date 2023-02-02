import React from "react";
import fs from "fs";
import Card from "../../components/common/Card/Card";
import InfoCards from "../../components/common/InfoCards/InfoCards";
import ConnectorsInfo from "../../components/ConnectorsInfo/ConnectorsInfo";
import bannerStyles from "../../components/common/Banner/Banner.module.css";
import YouTube from "../../components/common/Youtube/Youtube";
import NewsEntry from "../../components/NewsEntry/NewsEntry";
import Button from "../../components/common/Button/Button";
import { ReactComponent as ArrowRight } from "../../images/icons/arrow-right.svg";
import TopNav from "../../components/TopNav/TopNav";
import LayoutSelector from "../../components/LayoutSelector/LayoutSelector";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import {
  getArticleSlugFromString,
  getArticleSlugs,
  getMenu,
} from "../../lib/api";
import Footer from "../../components/Footer/Footer";
import { PathObj } from "../../interface/common.interface";
import { basename } from "path";
import matter from "gray-matter";
import { getUrlWithVersion } from "../../utils/CommonUtils";

export default function index({ menu }) {
  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={true}>
        <CategoriesNav menu={menu} />
        <div className="home-page">
          <div className={bannerStyles.Container}>
            <div className={bannerStyles.Content}>
              <div className="mb-8">
                <div className={bannerStyles.Heading}>
                  OpenMetadata Documentation
                </div>
                <section className={bannerStyles.Divider} />
                <p className="text-xl">
                  Unlock the value of data assets with an end-to-end metadata
                  management solution that includes data discovery, governance,
                  data quality, observability, and people collaboration.
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
                  href={getUrlWithVersion("/quick-start")}
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
              <Card
                heading="Features"
                content="OpenMetadata includes a rapidly growing set of features to address common needs in data discovery, quality, observability, and collaboration."
                url={getUrlWithVersion("/features")}
              />
              <Card
                heading="Docker Deployment"
                content="Deploying OpenMetadata in Docker is a great start! Take a look at our Quickstart guide to learn how to get OpenMetadata up and running locally in less than 7 minutes!"
                url={getUrlWithVersion("/deployment")}
              />
              <Card
                heading="Metadata Ingestion"
                content="OM serves as a centralised platform where users can gather and collaborate around data and deploy and schedule to connect to the data sources to extract metadata."
                url={getUrlWithVersion("/ingestion")}
              />
            </div>
          </div>
          <div className="homepage-containers">
            <div className="container-heading">Title</div>
            <div className="cards-container">
              <InfoCards
                heading="OpenMetadata Sandbox"
                content="Sandbox set-up allow users to get the experience of OM with least efforts that mimics a real production setup."
                color="#1890FF"
              />
              <InfoCards
                heading="Latest Release 0.12.0"
                content="Roles & Policies, Teams Hierarchy, Slack & MS Teams Webhooks, Custom Attributes, and more…"
                color="#B02AAC"
              />
              <InfoCards
                heading="Discovery & Collaboration"
                content="OpenMetadata supports a rich set of features to enable Data Discovery & Collaboration."
                color="#008376"
              />
            </div>
          </div>
          <div className="homepage-containers">
            <div className="container-heading">Connectors</div>
            <ConnectorsInfo />
          </div>
          <div className="homepage-containers">
            <div className="container-heading">Blogs</div>
            <div className="flex justify-between">
              <NewsEntry
                title="OpenMetadata 0.11.0 release"
                text="Data Collaboration, Column-level Lineage, ML Models, Data Profiler, Advanced Search, Data Lake Connectors, and more."
                link="https://blog.open-metadata.org/openmetadata-0-11-release-8b82c85636a"
                image={<img src="/blog1.png" />}
              />
              <NewsEntry
                title="OpenMetadata 0.10.0 release"
                text="Backend APIs, Support for database schema objects, Hard deletion of entities, Refactor service connectors, DBT changes, Security updates, and more."
                link="https://blog.open-metadata.org/openmetadata-0-10-0-release-82c4f5533c3f"
                image={<img src="/blog2.png" />}
              />
              <NewsEntry
                title="Why OpenMetadata is the Right Choice for you"
                text="OpenMetadata is a fresh start on how to do Metadata right from first principles."
                link="https://blog.open-metadata.org/why-openmetadata-is-the-right-choice-for-you-59e329163cac"
                image={<img src="/blog3.png" />}
              />
            </div>
          </div>
          <div className="mt-20" />
          <Footer />
        </div>
      </LayoutSelector>
    </>
  );
}

export async function getStaticProps(context) {
  const version = context.params.version;
  return {
    props: {
      menu: getMenu(version),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths: PathObj[] = [];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data, content } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    const slugsArray = articles[index].split("/");

    const versionIndex =
      slugsArray.findIndex((slugString) => slugString === "content") + 1;

    const version = slugsArray[versionIndex];

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        version: version,
        fileName: articles[index],
        title: data.title ? (data.title as string) : "Untitled",
        description: data.description ? (data.description as string) : "",
      },
    };

    paths.push(path);
  }

  return {
    paths: paths,
    fallback: false,
  };
}
