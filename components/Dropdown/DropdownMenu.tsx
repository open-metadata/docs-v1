import React from "react";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuItem {
  label: string;
  value: string;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  onItemClick?: (item: DropdownMenuItem) => void;
}

function DropdownMenu({ items, onItemClick }: DropdownMenuProps) {
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedItem = items.find((item) => item.value === e.currentTarget.id);

    onItemClick(clickedItem);
  };

  return (
    <div className={styles.DropdownMenuContainer}>
      {items.map((item) => (
        <div
          className={styles.MenuItem}
          onClick={handleItemClick}
          id={item.value}
          key={item.value}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;
