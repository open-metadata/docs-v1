import fs from "fs";
import { join } from "path";
import findIndex from "lodash/findIndex";
import matter from "gray-matter";
import slugify from "slugify";

export const articleDirectory = join(process.cwd(), "pages/");

export function getMenu() {
  const menu = [];
  const fullPath = join(articleDirectory, `menu.md`);
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

  return menu;
}
