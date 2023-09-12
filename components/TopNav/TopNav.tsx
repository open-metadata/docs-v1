import React, { useCallback, useEffect, useState } from "react";
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
import { isEmpty, isString } from "lodash";
import { useDocVersionContext } from "../../context/DocVersionContext";
import {
  DEFAULT_VERSION,
  REGEX_VERSION_MATCH,
} from "../../constants/version.constants";
import SelectDropdown, { SelectOption } from "../SelectDropdown/SelectDropdown";
import { getUrlWithVersion } from "../../utils/CommonUtils";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import classNames from "classnames";
import { MdMenu, MdMenuOpen } from "react-icons/md";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

interface TopNavProps {
  versionsList: Array<SelectOption<string>>;
}

export default function TopNav({ versionsList }: TopNavProps) {
  const router = useRouter();
  const [displayNavBarCollapseButton, setDisplayNavBarCollapseButton] =
    useState(false);
  const { docVersion, onChangeDocVersion } = useDocVersionContext();
  const { navBarCollapsed, onChangeNavBarCollapsed } =
    useNavBarCollapsedContext();

  const handleVersionChange = (value: string) => {
    const path =
      router.asPath === "/"
        ? `/${value}`
        : router.asPath.replace(REGEX_VERSION_MATCH, value);

    router.push(path);
  };

  const handleCollapseButtonClick = useCallback(() => {
    onChangeNavBarCollapsed(!navBarCollapsed);
  }, [navBarCollapsed, onChangeNavBarCollapsed]);

  useEffect(() => {
    if (window && window.screen?.width <= 600) {
      setDisplayNavBarCollapseButton(true);
    }
  }, []);

  useEffect(() => {
    const regexToMatchVersionString = /v(\d+\.\d+\.\x)/g;

    if (router.pathname !== "/_error") {
      if (
        isString(router.query.version) &&
        regexToMatchVersionString.test(router.query.version)
      ) {
        onChangeDocVersion(router.query.version);
      } else {
        router.push(`/${DEFAULT_VERSION}${router.asPath}`);
      }
    }
  }, [router]);

  return (
    <nav
      className={classNames(
        styles.NavBar,
        navBarCollapsed ? styles.CollapsedNavBar : ""
      )}
    >
      <div className={styles.CollapsedDivContainer}>
        <div className={styles.LogoContainer}>
          <Link href={docVersion ? getUrlWithVersion("/", docVersion) : "/"}>
            <SvgLogo />
          </Link>
          {!isEmpty(versionsList) && (
            <SelectDropdown
              value={docVersion}
              options={versionsList}
              onChange={handleVersionChange}
            />
          )}
        </div>
        {displayNavBarCollapseButton && (
          <button
            className={styles.CollapseButton}
            onClick={handleCollapseButtonClick}
          >
            {navBarCollapsed ? <MdMenu size={32} /> : <MdMenuOpen size={32} />}
          </button>
        )}
      </div>
      <SearchContextProvider>
        <InstantSearch indexName="openmetadata-v1" searchClient={searchClient}>
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
          href="https://cloud.getcollate.io"
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
