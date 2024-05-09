import { RoadmapCategories } from "../../enums/Roadmap.enum";

export interface FeatureDetails {
  label: string;
  description: string;
  isCollate?: boolean;
}

export type RoadmapCategoriesList =
  | {
      key: number;
      feature: RoadmapCategories;
      color: string;
    }
    | {
      key: 0;
      feature: "";
      color: "";
    };

export type RoadmapData = Record<
  string,
  Array<{
    category: RoadmapCategories;
    features: Array<FeatureDetails>;
    release: number;
  }>
>;
