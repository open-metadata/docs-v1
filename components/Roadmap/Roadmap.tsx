import classNames from "classnames";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ROADMAP_DATA,
  ROADMAP_FEATURE_CATEGORY_LIST,
} from "../../constants/Roadmap.constants";
import { useDocVersionContext } from "../../context/DocVersionContext";
import {
  generateIdFromHeading,
  getUrlWithVersion,
} from "../../utils/CommonUtils";
import { Heading } from "../Heading/Heading";
import styles from "./Roadmap.module.css";
import RoadmapFeatureItem from "./RoadmapFeatureItem/RoadmapFeatureItem";

function Roadmap() {
  const { docVersion } = useDocVersionContext();
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const tableRef = useRef(null);
  const leftShadowDivRef = useRef(null);
  const rightShadowDivRef = useRef(null);

  const handleScroll = useCallback((e) => {
    // Show the left inner box shadow only if the container is scrolled from initial position
    if (e.target.scrollLeft > 0) {
      setShowLeftShadow(true);
    } else {
      setShowLeftShadow(false);
    }

    // Show the right inner box shadow only if the container is not scrolled all the way to the right
    if (e.target.scrollWidth - e.target.clientWidth === e.target.scrollLeft) {
      setShowRightShadow(false);
    } else {
      setShowRightShadow(true);
    }
  }, []);

  const lastCategoryName = useMemo(
    () =>
      ROADMAP_FEATURE_CATEGORY_LIST[ROADMAP_FEATURE_CATEGORY_LIST.length - 1]
        .feature,
    [ROADMAP_FEATURE_CATEGORY_LIST]
  );

  return (
    <div className={styles.Container}>
      <h1 className={styles.Heading}>Roadmap</h1>
      <p>
        Here is the OpenMetadata Roadmap for the next 3 releases. We are doing a
        monthly release, and we are going to evolve fast and adapt to the
        community needs.
      </p>
      <p>
        The below roadmap is subject to change based on community needs and
        feedback. Please file an Issue on{" "}
        <Link
          target="_blank"
          href="https://github.com/open-metadata/OpenMetadata/issues"
        >
          GitHub
        </Link>{" "}
        or ping us on{" "}
        <Link target="_blank" href="https://slack.open-metadata.org/">
          Slack
        </Link>{" "}
        if you would like to prioritize any feature or would like to add a new
        feature.
      </p>
      <p>
        You can check the latest release{" "}
        <Link href={getUrlWithVersion("/releases/all-releases", docVersion)}>
          here
        </Link>
        .
      </p>

      <h2 className="text-center m-0 mt-4">OpenMetadata Roadmap</h2>

      <div className={styles.RoadmapTableContainer}>
        <div
          ref={tableRef}
          className={styles.RoadmapTable}
          onScroll={handleScroll}
        >
          <div
            ref={leftShadowDivRef}
            className={classNames(
              styles.Shadow,
              styles.LeftShadow,
              showLeftShadow ? "d-block" : "hidden"
            )}
          />
          <div
            ref={rightShadowDivRef}
            className={classNames(
              styles.Shadow,
              styles.RightShadow,
              showRightShadow ? "d-block" : "hidden"
            )}
          />
          {ROADMAP_FEATURE_CATEGORY_LIST.map((category) => (
            <div
              className={classNames(
                `${category.color} ${category.key !== 0 ? "w-[200px]" : ""}`,
                styles.CategoryHeaderItem
              )}
              key={category.feature}
            >
              {category.feature}
            </div>
          ))}
          {Object.entries(ROADMAP_DATA).map(([release, releaseData]) =>
            ROADMAP_FEATURE_CATEGORY_LIST.map(
              ({ feature: featureCategory, color }) => (
                <div
                  className={styles.RoadmapDataItem}
                  key={`${release}-${featureCategory}`}
                >
                  {isEmpty(featureCategory) ? (
                    <div className={styles.ReleaseNameContainer}>
                      <Heading
                        className={styles.ReleaseName}
                        id={generateIdFromHeading(release)}
                        level={3}
                      >
                        {release}
                      </Heading>
                    </div>
                  ) : (
                    <div
                      className={classNames(styles.FeaturesList, {
                        [styles.FeaturesListBorder]:
                          lastCategoryName !== featureCategory,
                      })}
                    >
                      {releaseData
                        .find(
                          (dataItem) => dataItem.category === featureCategory
                        )
                        ?.features.map((feature) => (
                          <RoadmapFeatureItem
                            key={feature.label}
                            category={featureCategory}
                            release={release}
                            feature={feature}
                            color={color}
                          />
                        ))}
                    </div>
                  )}
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
