import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Dropdown.module.css";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrow-down.svg";
import classNames from "classnames";

interface DropdownProps {
  alignX?: "left" | "right";
  className?: string;
  name: string;
  popupContent: ReactNode;
}

function Dropdown({
  name,
  className,
  alignX = "left",
  popupContent,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>();

  const toggleDropdownVisibility = useCallback(() => {
    setVisible((visibility) => !visibility);
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape": {
        setVisible(false);
        break;
      }
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!dropdownContainerRef.current.contains(e.target as Node)) {
      setVisible(false);
    }
  };

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
      className={classNames(styles.DropdownContainer, className)}
      ref={dropdownContainerRef}
    >
      <button
        className={styles.DropdownButton}
        onClick={toggleDropdownVisibility}
      >
        <span className={styles.DropdownName}>{name}</span>
        <ArrowDownIcon className={styles.DropdownIcon} />
      </button>
      {visible && (
        <div
          className={classNames(
            styles.PopupContainer,
            alignX === "left" ? styles.LeftAligned : styles.RightAligned
          )}
        >
          {popupContent}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
