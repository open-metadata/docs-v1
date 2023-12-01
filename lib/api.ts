import fs from "fs";
import { join } from "path";
import slugify from "slugify";
import {
  ARTICLES_DIRECTORY,
  PARTIALS_DIRECTORY,
} from "../constants/common.constants";
import { VERSION_SELECT_DEFAULT_OPTIONS } from "./../constants/version.constants";

export function getAllFilesInDirectory(
  articleDirectory: string,
  files: string[] = []
) {
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

export function getArticleSlugs() {
  const files = getAllFilesInDirectory(ARTICLES_DIRECTORY);
  return files;
}

export function getArticleSlugFromString(pathname) {
  return slugify(pathname).toLowerCase();
}

export const getVersionsList = () => {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    const versionsList = versionsArray
      // content folder now also has other folders like partial or the next release snapshot content with the versions folders
      // this check is to select only versions folders
      .filter((version) => /^v(\d+\.\d+\.\x)$/g.test(version))
      .map((version) => ({
        label: version,
        value: version,
      }));

    versionsList.sort();
    versionsList.reverse();

    return versionsList;
  } catch (error) {
    return VERSION_SELECT_DEFAULT_OPTIONS;
  }
};

export const getPartialsConfigObject = () => {
  try {
    const allPartials = getAllFilesInDirectory(PARTIALS_DIRECTORY);
    const partialsObject: Record<string, string> = {};
    allPartials.forEach((partialPath) => {
      const filePath = partialPath.split(PARTIALS_DIRECTORY).pop();
      const fileContent = fs.readFileSync(partialPath, "utf8");
      partialsObject[filePath] = fileContent;
    });

    return partialsObject;
  } catch (error) {
    return {};
  }
};
