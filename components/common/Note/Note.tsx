import React, { ReactNode, useEffect, useMemo, useState } from "react";

import styles from "./Note.module.css";

import { ReactComponent as Pin } from "../../../images/icons/pin.svg";
import { ReactComponent as Tip } from "../../../images/icons/tip.svg";
import { ReactComponent as Warning } from "../../../images/icons/warning.svg";
import classNames from "classnames";

interface NoteProps {
  children: ReactNode;
  noteType: string;
}

const Note = ({ children, noteType = "note" }: NoteProps) => {
  const [noteDetails, setNoteDetails] = useState<{
    icon: ReactNode;
    className: string;
  }>({ icon: <Pin className={styles.Icon} />, className: styles.Note });

  useEffect(() => {
    switch (noteType) {
      case "Warning": {
        setNoteDetails({
          icon: <Warning className={styles.Icon} />,
          className: styles.Warning,
        });
        break;
      }
      case "Tip": {
        setNoteDetails({
          icon: <Tip className={styles.Icon} />,
          className: styles.Tip,
        });
        break;
      }
      case "Note":
      default: {
        setNoteDetails({
          icon: <Pin className={styles.Icon} />,
          className: styles.Note,
        });
      }
    }
  }, [noteType]);

  return (
    <section className={classNames(styles.Container, noteDetails.className)}>
      <span>{noteDetails.icon}</span>
      <div className={styles.NoteContent}>{children}</div>
    </section>
  );
};

export default Note;
