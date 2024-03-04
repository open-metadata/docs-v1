import fs from "fs";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";

// API to get versions list from the content folder

export default function handler(req, res) {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    const versionOptionsObj = versionsArray
      .filter((version) => /^v(\d+\.\d+\.\x)$/g.test(version))
      .map((version) => ({
        label: version,
        value: version,
      }));

    res.status(200).json(versionOptionsObj);
  } catch (err) {
    res.status(err.code === "ENOENT" ? 404 : 400).send(err);
  }
}
