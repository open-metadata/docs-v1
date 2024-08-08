import fs from "fs";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";
import {
  DEFAULT_VERSION,
  REGEX_VERSION_MATCH,
} from "../../constants/version.constants";

// API to get versions list from the content folder

export default function handler(req, res) {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    const versionsList = versionsArray
      // content folder now also has other folders like partial or the next release snapshot content with the versions folders
      // this check is to select only versions folders
      .filter((version) => REGEX_VERSION_MATCH.test(version))
      .map((version) => ({
        label: version,
        value: version === DEFAULT_VERSION ? "latest" : version,
      }));

    versionsList.sort();
    versionsList.reverse();

    res.status(200).json(versionsList);
  } catch (err) {
    res.status(err.code === "ENOENT" ? 404 : 400).send(err);
  }
}
