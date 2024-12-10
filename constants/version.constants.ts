import { SelectOption } from "../components/SelectDropdown/SelectDropdown";

export const DEFAULT_VERSION = "v1.6.x";
export const LATEST_VERSION = "v1.6.x";
export const BETA_VERSION = "";  // Keep the constant empty when there is no BETA version

export const VERSION_SELECT_DEFAULT_OPTIONS: Array<SelectOption<string>> = [
  {
    label: DEFAULT_VERSION,
    value: DEFAULT_VERSION,
  },
];

export const REGEX_VERSION_MATCH = /(v\d+\.\d+\.\w+)|latest/;
export const REGEX_VERSION_MATCH_WITH_SLASH_AT_START =
  /^\/((v\d+\.\d+\.\w+)|latest)/g;
export const REGEX_TO_EXTRACT_VERSION_NUMBER = /\d+\.\d+/;
