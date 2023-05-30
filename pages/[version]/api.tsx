import React, { useMemo } from "react";
import fs from "fs";
import { APIElementInViewContextProvider } from "../../context/APIElementInViewContext";
import { getFormattedPartials } from "../../utils/CommonUtils";
import APIsPageSideNav from "../../components/PageLayouts/APIsPageLayout/APIsPageSideNav/APIsPageSideNav";
import APIsPageContent from "../../components/PageLayouts/APIsPageLayout/APIsPageContent/APIsPageContent";
import matter from "gray-matter";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";
import { getPartialsConfigObject } from "../../lib/api";
import Markdoc from "@markdoc/markdoc";
import { configs } from "../../lib/markdoc";

function api({ content, partials }) {
  const ast = useMemo(() => Markdoc.parse(content), [content]);

  const formattedPartialsObj = useMemo(
    () => getFormattedPartials(partials),
    [partials]
  );

  const parsedContent = useMemo(
    () =>
      Markdoc.transform(ast, {
        ...configs,
        partials: formattedPartialsObj,
      }),
    [ast, configs, formattedPartialsObj]
  );

  return (
    <APIElementInViewContextProvider>
      <div className="api-page-container">
        <APIsPageSideNav />
        <APIsPageContent parsedContent={parsedContent} />
      </div>
    </APIElementInViewContextProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const props = { menu: [], content: "", slug: [] };
    const partials = getPartialsConfigObject();

    const fileContents = fs.readFileSync(
      `${ARTICLES_DIRECTORY}/${context.params.version}/api/index.md`,
      "utf8"
    );
    const { content } = matter(fileContents);

    props["content"] = content;
    props["partials"] = partials;

    return { props };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default api;
