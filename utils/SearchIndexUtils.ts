import Markdoc, { Node } from "@markdoc/markdoc";
import fs from "fs";
import matter from "gray-matter";
import { startCase } from "lodash";
import * as pagefind from "pagefind";
import React from "react";
import searchIndexCreation from "../app.config";
import {
  ARTICLES_DIRECTORY,
  PARTIALS_DIRECTORY,
} from "../constants/common.constants";
import {
  getArticleSlugs,
  getPartialsConfigObject,
  getVersionsList,
} from "../lib/api";
import { components, configs } from "../lib/markdoc";
import { getFormattedPartials } from "./CommonUtils";

export const getFunctionToParseContentAndPushIndex =
  (
    partials: Record<string, Node>,
    index: pagefind.PagefindIndex,
    version: string
  ) =>
  async (articlePath: string) => {
    try {
      const fileContent = fs.readFileSync(
        `${ARTICLES_DIRECTORY}${articlePath}`,
        "utf8"
      );
      const contentURL = articlePath.replace(/(\/index\.md)$|(\.md)$/, "");

      const { content, data } = matter(fileContent);

      const ast = Markdoc.parse(content);

      const markdocContent = Markdoc.transform(ast, {
        ...configs,
        partials,
      });

      const html = Markdoc.renderers.html(markdocContent);

      const parsedHTML = Markdoc.renderers.react(
        `<html>${
          data.title
            ? `<h1 data-pagefind-meta="title">${startCase(data.title)}</h1>`
            : ""
        }${html}</html>`,
        React,
        {
          components,
        }
      );

      await index.addHTMLFile({
        url: `/${version}${
          data.slug?.toLowerCase() ?? contentURL.toLowerCase()
        }`,
        content: parsedHTML.toString(),
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

export const getFunctionToCreateIndexForAVersion =
  (articlePaths: string[], partials: Record<string, Node>) =>
  async ({ label: version }) => {
    try {
      const articlesForSelectedVersion = articlePaths.filter((path) =>
        path.startsWith(`/${version}`)
      );

      const { index } = await pagefind.createIndex({
        rootSelector: "html",
      });

      const indexCreationForArticles = articlesForSelectedVersion.map(
        getFunctionToParseContentAndPushIndex(partials, index, version)
      );

      await Promise.all(indexCreationForArticles);

      await index.writeFiles({
        outputPath: `./public/search_indices/${version}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

export const generateSearchIndices = async () => {
  try {
    const articlePaths = getArticleSlugs()
      .filter((path) => !path.includes(PARTIALS_DIRECTORY))
      .map((path) => path.split(ARTICLES_DIRECTORY)[1]);

    const partials = getFormattedPartials(getPartialsConfigObject());

    const versionsList = getVersionsList();

    const indexCreationForVersions = versionsList.map(
      getFunctionToCreateIndexForAVersion(articlePaths, partials)
    );

    await Promise.all(indexCreationForVersions);

    searchIndexCreation.updateSearchIndexCreationStatus(true);
  } catch (err) {
    console.error(err);
  }
};
