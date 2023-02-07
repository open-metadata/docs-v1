import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

interface Props {
  href: string;
  children: ReactNode;
  isExternalLink: boolean;
}

function Link({ href, children, isExternalLink = false }: Props) {
  return (
    <a href={isExternalLink ? href : getUrlWithVersion(href)}>{children}</a>
  );
}

export default Link;
