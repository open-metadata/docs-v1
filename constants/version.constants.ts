import { SelectOption } from "../components/SelectDropdown/SelectDropdown";

export const DEFAULT_VERSION = "v1.0.0";
export const STABLE_VERSION = "v1.0.0";

export const VERSION_SELECT_DEFAULT_OPTIONS: Array<SelectOption<string>> = [
  {
    label: DEFAULT_VERSION,
    value: DEFAULT_VERSION,
  },
];

export const REGEX_VERSION_MATCH = /v(\d+\.\d+\.\d+)/g;
