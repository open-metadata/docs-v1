import { SelectOption } from "../components/SelectDropdown/SelectDropdown";

export function getSelectedOption<T>(
  options: Array<SelectOption<T>>,
  value: T
): SelectOption<T> {
  // Using label to compare here instead of value since the value may contain 'latest' text
  const selectedOptions = options.find((option) => option.label === value);
  return selectedOptions;
}
