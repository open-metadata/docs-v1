import classNames from "classnames";
import { isBoolean } from "lodash";
import React from "react";
import {
  DEFAULT_PARAGRAPH,
  DEFAULT_TITLE,
} from "../../../constants/SkeletonLoader.constants";
import {
  getSkeletonHeading,
  getSkeletonParagraphs,
} from "../../../utils/SkeletonLoaderUtils";
import { SkeletonLoaderProps } from "./SkeletonLoader.interface";
import styles from "./SkeletonLoader.module.css";

function SkeletonLoader({
  className,
  title = DEFAULT_TITLE,
  paragraph = DEFAULT_PARAGRAPH,
}: SkeletonLoaderProps) {
  return (
    <div className={classNames(styles.Container, className)}>
      <>
        {title && getSkeletonHeading(title)}
        {paragraph && getSkeletonParagraphs(paragraph)}
      </>
    </div>
  );
}

export default SkeletonLoader;
