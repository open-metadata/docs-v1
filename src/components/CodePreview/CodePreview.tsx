import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

interface CodePreviewProps {
  children: React.ReactNode;
}

interface CodeInfoContainerProps {
  children: React.ReactNode;
}

interface CodeInfoProps {
  children: React.ReactNode;
  srNumber: number;
}

interface CodeBlockContainerProps {
  children: React.ReactNode;
  fileName?: string;
  theme?: 'default' | 'light' | 'gray';
}

export const CodePreview: React.FC<CodePreviewProps> = ({ children }) => {
  return <div className="custom-code-preview">{children}</div>;
};

export const CodeInfoContainer: React.FC<CodeInfoContainerProps> = ({ children }) => {
  return <div className="code-info-container">{children}</div>;
};

export const CodeInfo: React.FC<CodeInfoProps> = ({ children, srNumber }) => {
  return (
    <div className="code-info" data-sr-number={srNumber}>
      {children}
    </div>
  );
};

export const CodeBlockContainer: React.FC<CodeBlockContainerProps> = ({ 
  children, 
  fileName, 
  theme = 'default' 
}) => {
  return (
    <div className={`code-block-container code-block-container--${theme}`}>
      {fileName && (
        <div className="code-block-container__header">
          <span className="code-block-container__filename">{fileName}</span>
        </div>
      )}
      <div className="code-block-container__content">
        {children}
      </div>
    </div>
  );
};