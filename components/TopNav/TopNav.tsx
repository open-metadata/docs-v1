import algoliasearch from "algoliasearch/lite";
import classNames from "classnames";
import { isEmpty, isString, isUndefined } from "lodash";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { InstantSearch } from "react-instantsearch";
import {
  REGEX_VERSION_MATCH,
  REGEX_VERSION_MATCH_WITH_SLASH_AT_START,
} from "../../constants/version.constants";
import { useDocVersionContext } from "../../context/DocVersionContext";
import { useNavBarCollapsedContext } from "../../context/NavBarCollapseContext";
import { SearchContextProvider } from "../../context/SearchContext";
import { ReactComponent as ApiIcon } from "../../images/icons/api.svg";
import { ReactComponent as CloudIcon } from "../../images/icons/cloud.svg";
import { ReactComponent as GithubIcon } from "../../images/icons/github.svg";
import { ReactComponent as OMDIcon } from "../../images/icons/omd.svg";
import { ReactComponent as SlackIcon } from "../../images/icons/slack.svg";
import { getUrl } from "../../utils/CommonUtils";
import Search from "../Search/Search";
import SelectDropdown, { SelectOption } from "../SelectDropdown/SelectDropdown";
import styles from "./TopNav.module.css";
import ParamLink from "../ParamLink";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

interface TopNavProps {
  logo?: ReactNode;
  versionsList: Array<SelectOption<string>>;
}

export default function TopNav({ versionsList, logo }: Readonly<TopNavProps>) {
  const router = useRouter();
  const [displayNavBarCollapseButton, setDisplayNavBarCollapseButton] =
    useState(false);
  const { docVersion, onChangeDocVersion, enableVersion } = useDocVersionContext();
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
    if (router.pathname !== "/_error") {
      if (
        isString(router.query.version) &&
        REGEX_VERSION_MATCH.test(router.query.version)
      ) {
        onChangeDocVersion(router.query.version);
      } else {
        router.push(
          `/latest${router.asPath.replace(
            REGEX_VERSION_MATCH_WITH_SLASH_AT_START,
            ""
          )}`
        );
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
          <ParamLink
            href={getUrl({ url: "/", docVersion, enableVersion })}
            aria-label="omd-icon"
          >
            {isUndefined(logo) ? <OMDIcon /> : logo}
          </ParamLink>
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
            aria-label="menu-icon"
          >
            {navBarCollapsed ? <MdMenu size={32} /> : <MdMenuOpen size={32} />}
          </button>
        )}
      </div>
      <SearchContextProvider>
        <InstantSearch
          indexName={`openmetadata-v1-${docVersion}`}
          searchClient={searchClient}
          future={{
            preserveSharedStateOnUnmount: false,
          }}
        >
          <Search />
        </InstantSearch>
      </SearchContextProvider>
      <div className={styles.IconContainer}>
        <ParamLink
          href="https://slack.open-metadata.org"
          target="_blank"
          aria-label="slack-icon"
        >
          <SlackIcon />
        </ParamLink>
        <ParamLink
          href="https://github.com/open-metadata/OpenMetadata"
          target="_blank"
          aria-label="github-icon"
        >
          <GithubIcon />
        </ParamLink>
        <ParamLink
          href="/swagger.html"
          target="_blank"
          aria-label="api-icon"
        >
          <ApiIcon />
        </ParamLink>
        <ParamLink
          href="https://getcollate.io"
          target="_blank"
          aria-label="cloud-icon"
        >
          <button className={styles.CloudBtn} aria-label="cloud-icon">
            <CloudIcon />
          </button>
        </ParamLink>
      </div>
    </nav>
  );
}
