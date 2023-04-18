import { SelectOption } from "../components/SelectDropdown/SelectDropdown";

export function getSelectedOption<T>(
  options: Array<SelectOption<T>>,
  value: T
): SelectOption<T> {
  const selectedOptions = options.find((option) => option.value === value);
  return selectedOptions;
}
