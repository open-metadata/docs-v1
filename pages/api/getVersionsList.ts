import fs from "fs";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";

export default function handler(req, res) {
  const versionsArray = fs.readdirSync(ARTICLES_DIRECTORY);
  res.status(200).json(versionsArray);
}
