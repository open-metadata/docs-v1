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

  const isNewTabUrl = isExternalLink || PAGES_WITHOUT_VERSION.includes(href);

  const disableVersion = isNewTabUrl || href.startsWith("#");

  return (
    <Link
      href={getUrl({
        url: href,
        docVersion,
        enableVersion,
        isExternalLink: disableVersion,
      })}
      target={isNewTabUrl ? "_blank" : "_self"}
    >
      {children}
    </Link>
  );
}

export default CustomAnchorNode;
