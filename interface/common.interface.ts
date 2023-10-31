export interface MenuItem {
  category: string;
  children: MenuItem[];
  isCollateFeature?: boolean;
  depth: string;
  icon?: string;
  menu_key: string;
  name: string;
  url: string;
}

export interface PathObj {
  params: {
    slug: string[];
    location: string;
    version: string;
    fileName: string;
    title: string;
    description: string;
  };
}
