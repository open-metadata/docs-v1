import classNames from "classnames";
import {
  DEFAULT_PARAGRAPH,
  DEFAULT_TITLE,
} from "../../../constants/SkeletonLoader.constants";
import {
  getSkeletonBreadcrumbs,
  getSkeletonHeading,
  getSkeletonParagraphs,
} from "../../../utils/SkeletonLoaderUtils";
import { SkeletonLoaderProps } from "./SkeletonLoader.interface";
import styles from "./SkeletonLoader.module.css";

function SkeletonLoader({
  className,
  showBreadcrumb = false,
  title = DEFAULT_TITLE,
  paragraph = DEFAULT_PARAGRAPH,
}: Readonly<SkeletonLoaderProps>) {
  return (
    <div className={classNames(styles.Container, className)}>
      {showBreadcrumb && getSkeletonBreadcrumbs()}
      {title && getSkeletonHeading(title)}
      {paragraph && getSkeletonParagraphs(paragraph)}
    </div>
  );
}

export default SkeletonLoader;
