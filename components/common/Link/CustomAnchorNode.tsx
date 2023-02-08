import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

interface Props {
  href: string;
  children: ReactNode;
  isExternalLink: boolean;
}

function CustomAnchorNode({ href, children, isExternalLink = false }: Props) {
  return (
    <a href={isExternalLink ? href : getUrlWithVersion(href)}>{children}</a>
  );
}

export default CustomAnchorNode;
