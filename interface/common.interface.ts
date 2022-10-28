export interface MenuItem {
  category: string;
  children: MenuItem[];
  depth: string;
  icon?: string;
  menu_key: string;
  name: string;
  url: string;
}
