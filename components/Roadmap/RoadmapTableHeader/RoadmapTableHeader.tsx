import classNames from "classnames";
import { ROADMAP_FEATURE_CATEGORY_LIST } from "../../../constants/Roadmap.constants";
import styles from "./RoadmapTableHeader.module.css";

function RoadmapTableHeader() {
  return (
    <>
      {ROADMAP_FEATURE_CATEGORY_LIST.map((category) => (
        <div
          className={classNames(
            `${category.color} ${category.key !== 0 ? "w-[200px]" : "false"}`,
            styles.CategoryHeaderItem
          )}
          key={category.feature}
        >
          {category.feature}
        </div>
      ))}
    </>
  );
}

export default RoadmapTableHeader;
