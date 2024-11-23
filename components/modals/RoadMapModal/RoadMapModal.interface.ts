import { MouseEvent } from "react";
import { FeatureDetails } from "../../Roadmap/Roadmap.interface";

export interface RoadMapModalProps {
  feature: FeatureDetails;
  category: string;
  onClose: (
    e?: MouseEvent<HTMLButtonElement | HTMLDivElement, globalThis.MouseEvent>
  ) => void;
  show: boolean;
  release: string;
}
