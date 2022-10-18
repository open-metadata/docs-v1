import React from "react";
import Link from "next/link";
import styles from "./TopNav.module.css";

import { ReactComponent as SvgLogo } from "../../images/icons/omd.svg";
import { ReactComponent as Github } from "../../images/icons/github.svg";
import { ReactComponent as Slack } from "../../images/icons/slack.svg";
import { ReactComponent as Cloud } from "../../images/icons/cloud.svg";
import { ReactComponent as API } from "../../images/icons/api.svg";
import Search from "../Search/Search";

export default function TopNav() {
  return (
    <nav className={styles.NavBar}>
      <div className="flex justify-between align-center">
        <Link href="/">
          <a>
            <SvgLogo />
          </a>
        </Link>
        <div className={styles.VersionSelectorDiv}>
          <select
            className={styles.VersionSelector}
            name="version-selector"
            id="version-selector"
          >
            <option value="0.10.0">v 0.10.0</option>
            <option value="0.10.1">v 0.10.1</option>
            <option value="0.11.0">v 0.11.0</option>
            <option value="0.11.1">v 0.11.1</option>
            <option value="0.11.2">v 0.11.2</option>
            <option value="0.11.3">v 0.11.3</option>
            <option value="0.11.4">v 0.11.4</option>
            <option value="0.12.0">v 0.12.0</option>
            <option value="0.12.1">v 0.12.1</option>
          </select>
        </div>
      </div>
      <Search />
      <div className={styles.IconContainer}>
        <a href="https://slack.open-metadata.org" target="_blank" title="Slack">
          <Slack />
        </a>
        <a
          href="https://github.com/open-metadata/OpenMetadata"
          target="_blank"
          title="Github"
        >
          <Github />
        </a>
        <a href="/swagger.html" target="_blank" title="Swagger">
          <API />
        </a>
        <a
          className="btn fw-500 btn-primary rounded-pill"
          href="https://share.hsforms.com/1fstvMCeZRZKTYA4nG1VTPgcq0j9"
          target="_blank"
        >
          <button className={styles.CloudBtn}>
            <Cloud />
          </button>
        </a>
      </div>
    </nav>
  );
}
