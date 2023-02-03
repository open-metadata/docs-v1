import fs from "fs";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";

// API to get versions list from the content folder

export default function handler(req, res) {
  try {
    const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
    res.status(200).json(versionsArray);
  } catch (err) {
    res.status(err.code === "ENOENT" ? 404 : 400).send(err);
  }
}
