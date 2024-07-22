import Link from "next/link";
import React, { ReactNode } from "react";
import { getUrl } from "../../../utils/CommonUtils";
import { PAGES_WITHOUT_VERSION } from "../../../constants/pagesWithoutVersion.constants";
import { useDocVersionContext } from "../../../context/DocVersionContext";

interface Props {
  href: string;
  children: ReactNode;
}

function CustomAnchorNode({ href, children }: Props) {
  const { docVersion, enableVersion } = useDocVersionContext();
  const regexToIdentifyLink = /^(http|https|ftp|www)/g;

  const isExternalLink = href.search(regexToIdentifyLink) !== -1;

  let url: string;

  if (href.startsWith("#")) {
    url = href;
  } else {
    url = getUrl(href, docVersion, enableVersion);
  }

  return isExternalLink || PAGES_WITHOUT_VERSION.includes(href) ? (
    <a href={href} target="_blank">
      {children}
    </a>
  ) : (
    <Link href={url}>{children}</Link>
  );
}

export default CustomAnchorNode;
