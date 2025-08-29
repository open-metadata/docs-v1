import { SkeletonWidth } from "../../../enums/SkeletonLoder.enum";

export interface SkeletonLoaderParagraphProp {
  rows: number;
  width: SkeletonWidth | Array<SkeletonWidth | number>;
}
export interface SkeletonLoaderProps {
  className?: string;
  showBreadcrumb?: boolean;
  title?: boolean | SkeletonWidth | number;
  paragraph?: SkeletonLoaderParagraphProp | boolean;
}
