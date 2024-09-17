import classNames from "classnames";
import { isBoolean, isNumber, isString, uniqueId } from "lodash";
import { Fragment, ReactNode } from "react";
import { SkeletonLoaderParagraphProp } from "../components/common/SkeletonLoader/SkeletonLoader.interface";
import styles from "../components/common/SkeletonLoader/SkeletonLoader.module.css";
import { DEFAULT_PARAGRAPH } from "../constants/SkeletonLoader.constants";
import { SkeletonWidth } from "../enums/SkeletonLoder.enum";

const getWidthClass = (width: SkeletonWidth) => {
  switch (width) {
    case SkeletonWidth.SMALL: {
      return styles.Small;
    }
    case SkeletonWidth.LARGE: {
      return styles.Large;
    }
    case SkeletonWidth.FULL: {
      return styles.Full;
    }
    case SkeletonWidth.DEFAULT:
    default: {
      return styles.Default;
    }
  }
};

export const getSkeletonBreadcrumbs = () => {
  const arr = [1, 2, 3];

  return (
    <div className={classNames(styles.BreadCrumb)}>
      {arr.map((key, idx) => (
        <Fragment key={`${key}-${uniqueId()}`}>
          <div className={classNames(styles.BreadCrumbItem)}>
            <div className={styles.InsideDiv} />
          </div>
          {idx < arr.length - 1 && <div>/</div>}
        </Fragment>
      ))}
    </div>
  );
};

export const getSkeletonHeading = (title: SkeletonWidth | boolean | number) => {
  let widthClass: string;

  if (isNumber(title)) {
    return (
      <div
        className={classNames(styles.OutsideDiv, styles.Heading)}
        style={{ width: `${title}px` }}
      >
        <div className={styles.InsideDiv} />
      </div>
    );
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
    let widthClass = "";

    if (isString(width)) {
      widthClass = getWidthClass(width);
    } else if (!isNumber(width)) {
      widthClass = styles.Default;
    }

    if (widthClass) {
      return (
        <div
          className={classNames(
            styles.OutsideDiv,
            styles.Paragraph,
            widthClass
          )}
          key={`${widthClass}-${uniqueId()}`}
        >
          <div className={styles.InsideDiv} />
        </div>
      );
    } else {
      return (
        <div
          className={classNames(styles.OutsideDiv, styles.Paragraph)}
          style={{ width: `${width}px` }}
          key={`${widthClass}-${uniqueId()}`}
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
