import React from "react";
import Banner from "../components/common/Banner/Banner";
import Card from "../components/common/Card/Card";
import InfoCards from "../components/common/InfoCards/InfoCards";
import ConnectorsInfo from "../components/ConnectorsInfo/ConnectorsInfo";

export default function index() {
  return (
    <>
      <Banner
        heading="OpenMetadata Documentation"
        content="Unlock the value of data assets with an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration."
        videoId="ld43_jafL9w"
        bgColor="white"
      />
      <div className="overview-container">
        <div className="overview-heading">Overview</div>
        <p>
          OpenMetadata enables metadata management end-to-end, giving you the
          ability to unlock the value of data assets in the common use cases of
          data discovery and governance, but also in emerging use cases related
          to data quality, observability, and people collaboration.
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
    </>
  );
}
