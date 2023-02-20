import { SkeletonWidth } from "../enums/SkeletonLoder.enum";
import styles from "../components/common/SkeletonLoader/SkeletonLoader.module.css";
import { isArray, isBoolean, isNumber, isString } from "lodash";
import classNames from "classnames";
import { SkeletonLoaderParagraphProp } from "../components/common/SkeletonLoader/SkeletonLoader.interface";
import { DEFAULT_PARAGRAPH } from "../constants/SkeletonLoader.constants";
import { ReactNode } from "react";

const getWidthClass = (width: SkeletonWidth) => {
  switch (width) {
    case SkeletonWidth.SMALL: {
      return styles.Small;
    }
    case SkeletonWidth.LARGE: {
      return styles.Large;
    }
    case SkeletonWidth.DEFAULT:
    default: {
      return styles.Default;
    }
  }
};

export const getSkeletonHeading = (title: SkeletonWidth | boolean | number) => {
  let widthClass: string;

  if (isNumber(title)) {
    <div
      className={classNames(styles.OutsideDiv, styles.Heading)}
      style={{ width: `${title}px` }}
    >
      <div className={styles.InsideDiv} />
    </div>;
  } else if (isBoolean(title)) {
    widthClass = getWidthClass(SkeletonWidth.DEFAULT);
  } else {
    widthClass = getWidthClass(title);
  }

  return (
    <div className={classNames(styles.OutsideDiv, styles.Heading, widthClass)}>
      <div className={styles.InsideDiv} />
    </div>
  );
};

export const getParagraphs = (paragraph: SkeletonLoaderParagraphProp) => {
  let widthArray: Array<SkeletonWidth | number>;

  if (isString(paragraph.width)) {
    widthArray = Array(paragraph.rows).fill(paragraph.width);
  } else {
    widthArray = paragraph.width;
  }

  const paragraphNodes: ReactNode[] = widthArray.map((width) => {
    const widthClass = isNumber(width)
      ? ""
      : isString(width)
      ? getWidthClass(width)
      : styles.Default;

    if (widthClass) {
      return (
        <div
          className={classNames(
            styles.OutsideDiv,
            styles.Paragraph,
            widthClass
          )}
        >
          <div className={styles.InsideDiv} />
        </div>
      );
    } else {
      return (
        <div
          className={classNames(styles.OutsideDiv, styles.Paragraph)}
          style={{ width: `${width}px` }}
        >
          <div className={styles.InsideDiv} />
        </div>
      );
    }
  });

  return paragraphNodes;
};

export const getSkeletonParagraphs = (
  paragraph: SkeletonLoaderParagraphProp | boolean
) => {
  if (isBoolean(paragraph)) {
    return getParagraphs(DEFAULT_PARAGRAPH);
  } else {
    return getParagraphs(paragraph);
  }
};
