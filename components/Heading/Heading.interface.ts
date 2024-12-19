import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
  id?: string;
  level?: number;
  className?: string;
  searchWeight?: string;
}
