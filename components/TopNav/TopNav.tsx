import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./TopNav.module.css";

import { ReactComponent as SvgLogo } from "../../images/icons/omd.svg";
import { ReactComponent as Github } from "../../images/icons/github.svg";
import { ReactComponent as Slack } from "../../images/icons/slack.svg";
import { ReactComponent as Cloud } from "../../images/icons/cloud.svg";
import { ReactComponent as API } from "../../images/icons/api.svg";
import Search from "../Search/Search";
import { SearchContextProvider } from "../../context/SearchContext";
import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { isEmpty, isString, isUndefined } from "lodash";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { DEFAULT_VERSION } from "../../constants/version.constants";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

export default function TopNav() {
  const router = useRouter();
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const [versions, setVersions] = useState<Array<string>>([DEFAULT_VERSION]);

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Logic to handle case if router.asPath coming from page is '/v0.23.3' instead of '/v0.23.3/'
    const regexToMatchVersionString =
      isUndefined(router.query.slug) && router.pathname !== "/_error"
        ? /(\/v(\d*\.*)*)/g
        : /(\/v(\d*\.*)*\/)/g;

    const path =
      router.asPath === "/"
        ? `/${e.target.value}`
        : router.asPath.replace(
            regexToMatchVersionString,
            `/${e.target.value}/`
          );

    router.push(path);
  };

  const fetchVersionsList = async () => {
    try {
      const res = await fetch("/api/getVersionsList");

      const parsedResponse = await res.json();

      if (res.status === 200) {
        setVersions(parsedResponse);
      } else {
        setVersions([DEFAULT_VERSION]);
        console.error(
          "An error occurred while fetching versions list:",
          parsedResponse
        );
      }
    } catch (error) {
      setVersions([DEFAULT_VERSION]);
    }
  };

  useEffect(() => {
    fetchVersionsList();
  }, []);

  useEffect(() => {
    if (isString(router.query.version)) {
      onChangeDocVersion(router.query.version);
    }
  }, [router]);

  return (
    <nav className={styles.NavBar}>
      <div className="flex justify-between align-center">
        <Link href="/">
          <SvgLogo />
        </Link>
        {!isEmpty(versions) && (
          <div className={styles.VersionSelectorDiv}>
            <select
              className={styles.VersionSelector}
              name="version-selector"
              id="version-selector"
              value={docVersion}
              onChange={handleVersionChange}
            >
              {versions.map((version, id) => (
                <option key={`${version} ${id}`} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <SearchContextProvider>
        <InstantSearch indexName="openmetadata" searchClient={searchClient}>
          <Search />
        </InstantSearch>
      </SearchContextProvider>
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
