export interface MenuItem {
  category: string;
  children: MenuItem[];
  isCollateOnly?: boolean;
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

export interface UrlParams {
  url: string;
  docVersion: string;
  enableVersion: boolean;
  isExternalLink?: boolean;
}