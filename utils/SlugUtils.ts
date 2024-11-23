import fs from "fs";
import matter from "gray-matter";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { basename } from "path";
import { SelectOption } from "../components/SelectDropdown/SelectDropdown";
import {
  DEFAULT_VERSION,
  REGEX_TO_EXTRACT_VERSION_NUMBER,
} from "../constants/version.constants";
import { PathObj } from "../interface/common.interface";
import {
  getArticleSlugFromString,
  getArticleSlugs,
  getPartialsConfigObject,
} from "../lib/api";
import { SlugProps } from "../pages/[version]/[...slug]";

export async function getPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths: PathObj[] = [];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    const slugsArray = articles[index].split("/");

    const versionIndex =
      slugsArray.findIndex((slugString) => slugString === "content") + 1;

    const version = slugsArray[versionIndex];

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        version: version,
        fileName: articles[index],
        title: data.title ? (data.title as string) : "Untitled",
        description: data.description ? (data.description as string) : "",
      },
    };

    paths.push(path);
  }

  return paths;
}

export const getMajorVersionMatch = (
  versionsList: SelectOption<string>[],
  version: string
) =>
  versionsList.find((versionOption) => {
    // Extract the major version number from the version option
    const versionOptionNumber = REGEX_TO_EXTRACT_VERSION_NUMBER.exec(
      versionOption.label
    )[0];
    // Extract the major version number from the version in the URL
    const versionNumber = REGEX_TO_EXTRACT_VERSION_NUMBER.exec(version)[0];

    return versionOptionNumber === versionNumber;
  });

export const getReturnObjectForValidVersion = ({
  context,
  paths,
  versionsList,
}: {
  context: GetServerSidePropsContext;
  paths: PathObj[];
  versionsList: SelectOption<string>[];
}): GetServerSidePropsResult<SlugProps> => {
  const version = context.params.version as string;
  const slug = context.params.slug as string[];
  const pathWithoutVersion = slug.join("/");
  const versionNumber = version === "latest" ? DEFAULT_VERSION : version;

  let location = `/${versionNumber}/${pathWithoutVersion}`;

  const partials = getPartialsConfigObject();

  if ("slug" in context.params) {
    let filename = "";
    let notFound = true;

    for (const obj of paths) {
      if (`/${obj.params.version}${obj.params.location}` === location) {
        filename = obj.params.fileName;
        notFound = false;
        break;
      }
    }

    // If the file is not found in the content folder
    if (notFound) {
      // Check if the version is present in the existing versions list
      const isVersionPresent = versionsList.some(
        (versionOption) => versionOption.value === version
      );

      // If the version is present in versions list, return 404
      if (isVersionPresent) {
        return { notFound };
      }

      // If the version is not present in versions list,
      // check if the major version is present.
      // Ex. If v1.4.8 is in the URL and v1.4.8 is not in versions list but v1.4.x is so match the 1.4
      // and redirect to the respective version URL in this case to v1.4.x
      const majorVersionMatch = getMajorVersionMatch(versionsList, version);

      return {
        redirect: {
          permanent: false,
          destination: `/${
            majorVersionMatch?.value ?? "latest" // If major version match is not present, redirect to latest
          }/${pathWithoutVersion}`,
        },
      };
    }

    // Get the last element of the array to find the MD file
    const fileContents = fs.readFileSync(filename, "utf8");
    const { content, data } = matter(fileContents);

    // If the file is a collate only file, return 404
    if (data.collate) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        content,
        slug,
        versionsList,
        partials,
        pageTitle: data.title,
        pageDescription: data.description ?? "",
      },
    };
  }
};
