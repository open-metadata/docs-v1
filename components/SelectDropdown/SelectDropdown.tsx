import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SelectDropdown.module.css";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrow-down.svg";
import classNames from "classnames";
import { getSelectedOption } from "../../utils/SelectDropdownUtils";
import { uniqueId } from "lodash";
import { STABLE_VERSION } from "../../constants/version.constants";

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
  height,
  isVisible,
  id,
  options,
  value,
  width,
  onChange,
}: SelectDropdownProps<T>) {
  const [selectedOption, setSelectedOption] = useState<SelectOption<T>>(
    getSelectedOption<T>(options, value)
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(
    isVisible ?? false
  );
  const dropdownContainerRef = useRef<HTMLDivElement>();

  const idString = useMemo(() => id ?? uniqueId(), [id]);

  const handleSelectorClick = () => {
    setIsDropdownVisible((visibility) => !visibility);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape": {
        setIsDropdownVisible(false);
        break;
      }
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

  return (
    <div
      className={styles.Container}
      id={`select-container-${idString}`}
      ref={dropdownContainerRef}
    >
      <div
        className={styles.Selector}
        id={`select-dropdown-trigger-${idString}`}
        style={{ height: height ?? "", width: width ?? "" }}
        onClick={handleSelectorClick}
      >
        <span>
          {selectedOption ? selectedOption.label : options[0].label ?? ""}
        </span>
        <span className={styles.ArrowIcon}>
          <ArrowDownIcon />
        </span>
      </div>
      <div
        className={classNames(
          styles.DropdownContainer,
          isDropdownVisible ? styles.VisibleDropdown : ""
        )}
        id={`dropdown-container-${idString}`}
        style={{ top: `calc(${height} + 4px)` ?? "", minWidth: width ?? "" }}
      >
        {options.map((option) => (
          <span
            className={styles.SelectOptions}
            key={option.label}
            onClick={() => handleOptionClick(option)}
          >
            <span>{option.label}</span>
            {option.label === STABLE_VERSION ? (
              <span className={styles.StableLabel}>Stable</span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SelectDropdown;
