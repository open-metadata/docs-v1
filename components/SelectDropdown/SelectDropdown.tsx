import classNames from "classnames";
import { uniqueId } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BETA_VERSION,
  LATEST_VERSION,
} from "../../constants/version.constants";
import { useMenuItemsContext } from "../../context/MenuItemsContext";
import { useRouteChangingContext } from "../../context/RouteChangingContext";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrow-down.svg";
import { getSelectedOption } from "../../utils/SelectDropdownUtils";
import styles from "./SelectDropdown.module.css";

export interface SelectOption<V> {
  label: string;
  value: V;
}

interface SelectDropdownProps<T> {
  height?: string;
  isVisible?: boolean;
  id?: string;
  options: Array<SelectOption<T>>;
  value?: T;
  width?: string;
  onChange: (value: T) => void;
}

function SelectDropdown<T>({
  height = "",
  isVisible,
  id,
  options,
  value,
  width = "",
  onChange,
}: Readonly<SelectDropdownProps<T>>) {
  const [selectedOption, setSelectedOption] = useState<SelectOption<T>>(
    getSelectedOption<T>(options, value)
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(
    isVisible ?? false
  );
  const isMounting = useRef(true);
  const dropdownContainerRef = useRef<HTMLDivElement>();
  const { isRouteChanging } = useRouteChangingContext();
  const { isMenuLoading } = useMenuItemsContext();

  const idString = useMemo(() => id ?? uniqueId(), [id]);

  const handleSelectorClick = () => {
    setIsDropdownVisible((visibility) => !visibility);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDropdownVisible(false);
    }
  };

  const handleOptionClick = (option: SelectOption<T>) => {
    setSelectedOption(getSelectedOption<T>(options, option.value));
    setIsDropdownVisible(false);
    onChange(option.value);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!dropdownContainerRef.current.contains(e.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  const getVersionTag = useCallback((option: SelectOption<T>) => {
    if (option?.label === LATEST_VERSION) {
      return (
        <span className={classNames(styles.VersionLabel, styles.LatestLabel)}>
          Latest
        </span>
      );
    }
    if (option?.label === BETA_VERSION) {
      return (
        <span className={classNames(styles.VersionLabel, styles.BetaLabel)}>
          Beta
        </span>
      );
    }

    return null;
  }, []);

  // To avoid flickering of version tag on initial load
  // If default value is not in the URL, the tag for the default value should not be shown
  // till we set the final value from the URL as selected version
  const showVersionTag = useMemo(
    () => !isMounting.current && !isRouteChanging && !isMenuLoading,
    [isMounting.current, isRouteChanging, isMenuLoading]
  );

  useEffect(() => {
    setSelectedOption(getSelectedOption<T>(options, value));
  }, [options, value]);

  useEffect(() => {
    if (dropdownContainerRef.current) {
      document.body.addEventListener("click", handleOutsideClick);
    }
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownContainerRef.current]);

  useEffect(() => {
    isMounting.current = false;
  }, []);

  return (
    <div
      className={styles.Container}
      id={`select-container-${idString}`}
      ref={dropdownContainerRef}
    >
      <div className="flex gap-1 items-center">
        <button
          className={styles.Selector}
          id={`select-dropdown-trigger-${idString}`}
          style={{ height, width }}
          onClick={handleSelectorClick}
        >
          <span>
            {selectedOption ? selectedOption.label : options[0].label ?? ""}
          </span>
          <span className={styles.ArrowIcon}>
            <ArrowDownIcon />
          </span>
        </button>
        {showVersionTag && getVersionTag(selectedOption)}
      </div>
      <div
        className={classNames(
          styles.DropdownContainer,
          isDropdownVisible ? styles.VisibleDropdown : ""
        )}
        id={`dropdown-container-${idString}`}
        style={{ top: `calc(${height} + 4px)`, minWidth: width }}
      >
        {options.map((option) => (
          <button
            className={styles.SelectOptions}
            key={option.label}
            onClick={() => handleOptionClick(option)}
          >
            <span>{option.label}</span>
            {getVersionTag(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectDropdown;
