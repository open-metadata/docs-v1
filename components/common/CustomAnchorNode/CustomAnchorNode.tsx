import Link from "next/link";
import React, { ReactNode } from "react";
import { getUrlWithVersion } from "../../../utils/CommonUtils";

interface Props {
  href: string;
  children: ReactNode;
}

function CustomAnchorNode({ href, children }: Props) {
  const regexToIdentifyLink = /^(http|https|ftp|www)/g;

  const isExternalLink = href.search(regexToIdentifyLink) !== -1;

  return isExternalLink ? (
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
