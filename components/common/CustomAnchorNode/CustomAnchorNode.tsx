import React, { ReactNode } from "react";
import { getUrl } from "../../../utils/CommonUtils";
import { PAGES_WITHOUT_VERSION } from "../../../constants/pagesWithoutVersion.constants";
import { useDocVersionContext } from "../../../context/DocVersionContext";
import ParamLink from "../../ParamLink";
import { useRouter } from "next/router";

interface Props {
  href: string;
  children: ReactNode;
}

function CustomAnchorNode({ href, children }: Props) {
  const { enableVersion } = useDocVersionContext();
  const router = useRouter();
  const regexToIdentifyLink = /^(http|https|ftp|www)/g;

  const isExternalLink = href.search(regexToIdentifyLink) !== -1;

  const isNewTabUrl = isExternalLink || PAGES_WITHOUT_VERSION.includes(href);

  const disableVersion = isNewTabUrl || href.startsWith("#");

  return (
    <ParamLink
      href={getUrl({
        url: href,
        docVersion: router.query.version as string,
        enableVersion,
        isExternalLink: disableVersion,
      })}
      target={isNewTabUrl ? "_blank" : "_self"}
    >
      {children}
    </ParamLink>
  );
}

export default CustomAnchorNode;
