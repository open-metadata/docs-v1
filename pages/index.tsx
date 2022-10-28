import React from 'react';
import Card from '../components/common/Card/Card';
import InfoCards from '../components/common/InfoCards/InfoCards';
import ConnectorsInfo from '../components/ConnectorsInfo/ConnectorsInfo';
import bannerStyles from '../components/common/Banner/Banner.module.css';
import YouTube from '../components/common/Youtube/Youtube';
import NewsEntry from '../components/NewsEntry/NewsEntry';
import Button from '../components/common/Button/Button';
import { ReactComponent as ArrowRight } from '../images/icons/arrow-right.svg';
import TopNav from '../components/TopNav/TopNav';
import LayoutSelector from '../components/LayoutSelector/LayoutSelector';
import CategoriesNav from '../components/CategoriesNav/CategoriesNav';
import { getMenu } from '../lib/api';
import { homeMenuItem } from '../constants/common.constants';

export default function index({ menu }) {
  return (
    <>
      <TopNav />
      <LayoutSelector collapsedNav={true}>
        <CategoriesNav menu={[homeMenuItem, ...menu]} />
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
                <Button href="/quick-start" type="link">
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
                url="/features"
              />
              <Card
                heading="Docker Deployment"
                content="Deploying OpenMetadata in Docker is a great start! Take a look at our Quickstart guide to learn how to get OpenMetadata up and running locally in less than 7 minutes!"
                url="/deployment"
              />
              <Card
                heading="Metadata Ingestion"
                content="OM serves as a centralised platform where users can gather and collaborate around data and deploy and schedule to connect to the data sources to extract metadata."
                url="/ingestion"
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
        </div>
      </LayoutSelector>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      menu: await getMenu(),
    },
    revalidate: 60,
  };
}
