import React from "react";

import CalloutStyles from "./callout.module.css";
import NoteStyles from "./Note.module.css";

import IconHeader from "../IconHeader/iconHeader";
import { ReactComponent as Pin } from "../../../images/icons/pin.svg";

const Note = ({ children }) => {
  return (
    <section className={`${CalloutStyles.Container} ${NoteStyles.Note}`}>
      <IconHeader
        icon={<Pin />}
        title="Note"
        background="l-blue-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Note;
