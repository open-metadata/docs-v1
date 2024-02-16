import { createRequire } from "module";
import * as pagefind from "pagefind";
const require = createRequire(import.meta.url);

const fs = require("node:fs");
const Markdoc = require("@markdoc/markdoc");
const { join } = require("path");
const matter = require("gray-matter");

const ARTICLES_DIRECTORY = join(process.cwd(), "content");
const PARTIALS_DIRECTORY = join(process.cwd(), "content/partials");

function getAllFilesInDirectory(articleDirectory, files = []) {
  fs.readdirSync(articleDirectory).forEach(function (file) {
    const subpath = join(articleDirectory, file);
    if (fs.lstatSync(subpath).isDirectory()) {
      getAllFilesInDirectory(subpath, files);
    } else {
      files.push(subpath);
    }
  });
  return files;
}

export const getVersionsList = () => {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    return versionsArray.filter((version) =>
      /^v(\d+\.\d+\.\x)$/g.test(version)
    );
  } catch (error) {
    return [];
  }
};

const getPartialsConfigObject = () => {
  try {
    const allPartials = getAllFilesInDirectory(PARTIALS_DIRECTORY);
    const partialsObject = {};
    allPartials.forEach((partialPath) => {
      const filePath = partialPath.split(PARTIALS_DIRECTORY).pop();
      const fileContent = fs.readFileSync(partialPath, "utf8");
      partialsObject[`/${filePath}`] = fileContent;
    });

    return partialsObject;
  } catch (error) {
    return {};
  }
};

const getFormattedPartials = (partialsObject) => {
  if (partialsObject.length === 0) {
    return {};
  }
  const formattedPartialsObj = {};

  Object.entries(partialsObject).forEach(([key, value]) => {
    formattedPartialsObj[key] = Markdoc.parse(value);
  });

  return formattedPartialsObj;
};

function getArticleSlugs() {
  const files = getAllFilesInDirectory(ARTICLES_DIRECTORY);
  return files;
}

const articlePaths = getArticleSlugs()
  .filter((path) => !path.includes(PARTIALS_DIRECTORY))
  .map((path) => path.split(ARTICLES_DIRECTORY)[1]);

const partials = getFormattedPartials(getPartialsConfigObject());

const versionsList = getVersionsList();

versionsList.forEach(async (version) => {
  const versionArticles = articlePaths.filter((path) =>
    path.startsWith(`/${version}`)
  );

  const { index } = await pagefind.createIndex({
    rootSelector: "article",
  });

  versionArticles.forEach(async (articlePath) => {
    const fileContent = fs.readFileSync(
      `${ARTICLES_DIRECTORY}${articlePath}`,
      "utf8"
    );
    const contentURL = articlePath.replace(/(\/index\.md)$|(\.md)$/, "");

    const { content, data } = matter(fileContent);

    const ast = Markdoc.parse(content);

    const markdocContent = Markdoc.transform(ast, {
      partials,
    });

    const html = Markdoc.renderers.html(markdocContent);

    await index.addHTMLFile({
      url: `/${version}${data.slug?.toLowerCase() ?? contentURL.toLowerCase()}`,
      content: html,
    });
  });

  await index.writeFiles({
    outputPath: `./public/search_indices/${version}`,
  });
});
