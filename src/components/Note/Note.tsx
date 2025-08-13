import React from 'react';
import classNames from 'classnames';

interface NoteProps {
  children: React.ReactNode;
  noteType?: 'Note' | 'Warning' | 'Tip';
}

const Note: React.FC<NoteProps> = ({ children, noteType = 'Note' }) => {
  return (
    <div
      className={classNames('custom-note', {
        'custom-note--note': noteType === 'Note',
        'custom-note--warning': noteType === 'Warning',
        'custom-note--tip': noteType === 'Tip',
      })}
    >
      <div className="custom-note__header">
        <strong>{noteType}</strong>
      </div>
      <div className="custom-note__content">{children}</div>
    </div>
  );
};

export default Note;