import { SelectOption } from "../components/SelectDropdown/SelectDropdown";

export const DEFAULT_VERSION = "v1.9.x";
export const LATEST_VERSION = "v1.9.x";
export const BETA_VERSION = "";  // Keep the constant empty when there is no BETA version

export const VERSION_SELECT_DEFAULT_OPTIONS: Array<SelectOption<string>> = [
  {
    label: DEFAULT_VERSION,
    value: DEFAULT_VERSION,
  },
];

// The regex will match all the following:
// v1.6.x-SNAPSHOT, v1.6.x, latest
export const REGEX_VERSION_MATCH =
  /(v\d+\.\d+\.\w+-SNAPSHOT)|latest|(v\d+\.\d+\.\w+)/;

// The regex will match all the following:
// /v1.6.x-SNAPSHOT, /v1.6.x, /latest
export const REGEX_VERSION_MATCH_WITH_SLASH_AT_START =
  /^\/((v\d+\.\d+\.\w+-SNAPSHOT)|latest|(v\d+\.\d+\.\w+))/g;

// The regex will match all the following:
// 1.6
export const REGEX_TO_EXTRACT_VERSION_NUMBER = /\d+\.\d+/;

export const REGEX_PATTERN_FOR_OLD_VERSION = /^v\d+\.\d+$/;
