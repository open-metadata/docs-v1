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
  DEFAULT_VERSION,
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
  weight?: string;
}

export default function Article({
  content,
  slug,
  versionsList,
  partials,
  weight,
  pageTitle,
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

  return (
    <>
      <div
        className="hidden"
        data-pagefind-sort="weight[data-weight]"
        data-pagefind-meta="title"
        data-weight={weight ?? "0"}
        id="article-title-metadata"
      >
        {pageTitle}
      </div>
      {isAPIsPage.value ? (
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
      )}
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SlugProps>> {
  try {
    const version = context.params.version as string;
    const slug = context.params.slug as string[];
    const pathWithoutVersion = slug.join("/");

    // If the version in the URL is the default version, change the path to /latest
    if (version === DEFAULT_VERSION) {
      return {
        redirect: {
          permanent: false,
          destination: `/latest/${pathWithoutVersion}`,
        },
      };
    }

    // Get all paths for the docs
    const paths = await getPaths();

    // Default props
    const props: SlugProps = {
      content: "",
      slug: [],
      versionsList: [],
      partials: {},
      pageTitle: "",
      pageDescription: "",
    };

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
      }
    }

    return { props };
  } catch {
    return {
      notFound: true,
    };
  }
}
