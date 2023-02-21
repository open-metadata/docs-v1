import { SkeletonWidth } from "../enums/SkeletonLoder.enum";

export const DEFAULT_TITLE = SkeletonWidth.SMALL;

export const DEFAULT_PARAGRAPH = {
  rows: 3,
  width: [SkeletonWidth.LARGE, SkeletonWidth.LARGE, SkeletonWidth.DEFAULT],
};

export const SKELETON_PARAGRAPH_WIDTHS = [
  SkeletonWidth.LARGE,
  undefined,
  SkeletonWidth.LARGE,
  undefined,
  undefined,
  SkeletonWidth.SMALL,
];
