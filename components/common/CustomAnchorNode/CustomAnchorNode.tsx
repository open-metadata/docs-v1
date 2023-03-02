import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

interface Props {
  href: string;
  children: ReactNode;
}

function CustomAnchorNode({ href, children }: Props) {
  const regexToIdentifyLink = /^(http|https|ftp|www)/g;

  const isExternalLink = href.search(regexToIdentifyLink) !== -1;

  return (
    <a href={isExternalLink ? href : getUrlWithVersion(href)}>{children}</a>
  );
}

export default CustomAnchorNode;
