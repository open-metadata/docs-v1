import Markdoc from "@markdoc/markdoc";
import { isEqual, isObject, isUndefined } from "lodash";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useMemo } from "react";
import Footer from "../../components/Footer/Footer";
import APIPageLayout from "../../components/PageLayouts/APIPageLayout/APIPageLayout";
import DocsPageLayout from "../../components/PageLayouts/DocsPageLayout/DocsPageLayout";
import { SelectOption } from "../../components/SelectDropdown/SelectDropdown";
import TopNav from "../../components/TopNav/TopNav";
import { API_AND_SDK_MENU_ITEMS } from "../../constants/categoriesNav.constants";
import {
  REGEX_PATTERN_FOR_OLD_VERSION,
  REGEX_VERSION_MATCH,
} from "../../constants/version.constants";
import { getVersionsList } from "../../lib/api";
import { configs } from "../../lib/markdoc";
import { getFormattedPartials } from "../../utils/CommonUtils";
import {
  getPaths,
  getReturnObjectForValidVersion,
} from "../../utils/SlugUtils";

export interface SlugProps {
  content: string;
  slug: string[];
  versionsList: Array<SelectOption<string>>;
  partials: Record<string, string>;
  pageTitle: string;
  pageDescription: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function Article({
  content,
  slug,
  versionsList,
  partials,
}: Readonly<SlugProps>) {
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

  const isAPIsPage = useMemo(() => {
    const matchedObject = API_AND_SDK_MENU_ITEMS.find((item) => {
      const slugFromItemPath = item.value.split("/");
      // Removing first element which will be empty
      slugFromItemPath.shift();

      return isEqual(slug, slugFromItemPath);
    });

    return isObject(matchedObject)
      ? { value: true, pageInfoObject: matchedObject }
      : { value: false, pageInfoObject: { label: "", value: "" } };
  }, [slug]);

  return isAPIsPage.value ? (
    <APIPageLayout
      parsedContent={parsedContent}
      pageInfoObject={isAPIsPage.pageInfoObject}
    />
  ) : (
    <DocsPageLayout
      navbar={<TopNav versionsList={versionsList} />}
      parsedContent={parsedContent}
      slug={slug}
      footer={<Footer />}
    />
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SlugProps>> {
  try {
    const version = context.params.version as string;

    // Get all paths for the docs
    const paths = await getPaths();

    // Check if the version field passed in context params is proper version format
    const isVersionValid = REGEX_VERSION_MATCH.test(version);

    const versionsList: Array<SelectOption<string>> = getVersionsList();

    // Handle the case when the version is valid
    if (isVersionValid) {
      const returnObj = getReturnObjectForValidVersion({
        context,
        paths,
        versionsList,
      });

      if (!isUndefined(returnObj)) {
        return returnObj;
      } else {
        return {
          notFound: true,
        };
      }
    } else {
      const url = REGEX_PATTERN_FOR_OLD_VERSION.test(context.query.version as string) 
        ? `/latest/${(context.query.slug as string[]).join('/')}` 
        : `/latest${context.resolvedUrl}`;
      return {
        redirect: {
          permanent: true,
          destination: url,
        },
      };
    }
  } catch {
    return {
      notFound: true,
    };
  }
}
