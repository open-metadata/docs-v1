import fs from "fs";
import matter from "gray-matter";
import { findIndex } from "lodash";
import { join } from "path";
import slugify from "slugify";
import { ARTICLES_DIRECTORY } from "../../constants/common.constants";

// API to get menu list from the version directory
// query : version eg. v0.13.2

export default function handler(req, res) {
  try {
    const menu = [];

    const fullPath = join(ARTICLES_DIRECTORY, req.query.version, `menu.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const data = matter(fileContents);

    let menuRoot = menu;
    let objRoot = menu;

    const flatMenu = data.data["site_menu"];

    for (const index in flatMenu) {
      const item = flatMenu[index];
      const category = item["category"].split("/");
      // Move to the depth we need
      for (const depth in category) {
        const menu_key = slugify(category[depth].trim().toLowerCase());
        let exist = findIndex(menuRoot, { menu_key: menu_key });
        if (exist < 0) {
          menuRoot.push({
            menu_key: menu_key,
            name: category[depth].trim(),
            depth: depth,
            children: [],
          });
          exist = findIndex(menuRoot, { menu_key: menu_key });
        }
        objRoot = menuRoot[exist];
        menuRoot = menuRoot[exist]["children"];
      }
      Object.assign(objRoot, item);
      menuRoot = menu;
    }

    res.status(200).json(menu);
  } catch (err) {
    res.status(err.code === "ENOENT" ? 404 : 400).send(err);
  }
}
