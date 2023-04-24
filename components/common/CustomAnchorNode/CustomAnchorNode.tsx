import Link from "next/link";
import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../utils/CommonUtils";
import { PAGES_WITHOUT_VERSION } from "../../../constants/pagesWithoutVersion.constants";

interface Props {
  href: string;
  children: ReactNode;
}

function CustomAnchorNode({ href, children }: Props) {
  const regexToIdentifyLink = /^(http|https|ftp|www)/g;

  const isExternalLink = href.search(regexToIdentifyLink) !== -1;

  return isExternalLink || PAGES_WITHOUT_VERSION.includes(href) ? (
    <a href={href} target="_blank">
      {children}
    </a>
  ) : (
    <Link href={href.startsWith("#") ? href : getUrlWithVersion(href)}>
      {children}
    </Link>
  );
}

export default CustomAnchorNode;
