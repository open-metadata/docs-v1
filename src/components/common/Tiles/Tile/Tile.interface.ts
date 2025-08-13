import { ReactNode } from "react";

export interface TileProps {
  description: string;
  link: string;
  title: string;
  isExternalLink?: boolean;
  children?: ReactNode;
  icon?: string;
}
