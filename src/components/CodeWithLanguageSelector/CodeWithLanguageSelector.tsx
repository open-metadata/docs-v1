import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import classNames from 'classnames';

interface CodeWithLanguageSelectorProps {
  children: React.ReactNode;
  title?: string;
  languagesArray: string[];
  id: string;
  theme?: 'default' | 'light' | 'gray';
}

interface CodeBlockData {
  language: string;
  code: string;
}

const CodeWithLanguageSelector: React.FC<CodeWithLanguageSelectorProps> = ({
  children,
  title,
  languagesArray,
  id,
  theme = 'default',
}) => {
  const [activeLanguage, setActiveLanguage] = useState(languagesArray[0]);

  // Parse children to extract code blocks - for MDX usage
  const parseCodeBlocks = (children: React.ReactNode): CodeBlockData[] => {
    const blocks: CodeBlockData[] = [];
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === 'pre') {
          const codeElement = child.props.children;
          if (React.isValidElement(codeElement) && codeElement.props.className) {
            const language = codeElement.props.className.replace('language-', '');
            const code = codeElement.props.children;
            blocks.push({ language, code });
          }
        }
      }
    });
    
    return blocks;
  };

  const codeBlocks = parseCodeBlocks(children);
  const activeCodeBlock = codeBlocks.find((block) => block.language === activeLanguage);

  const getLanguageName = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      js: 'JavaScript',
      javascript: 'JavaScript',
      ts: 'TypeScript',
      typescript: 'TypeScript',
      py: 'Python',
      python: 'Python',
      java: 'Java',
      bash: 'Bash',
      sh: 'Shell',
      json: 'JSON',
      yaml: 'YAML',
      yml: 'YAML',
      xml: 'XML',
      sql: 'SQL',
    };
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className={classNames('code-with-language-selector', {
      [`code-with-language-selector--${theme}`]: theme !== 'default',
    })}>
      {title && (
        <div className="code-with-language-selector__title">
          <h4>{title}</h4>
        </div>
      )}
      <div className="code-with-language-selector__tabs">
        {languagesArray.map((language) => (
          <button
            key={language}
            className={classNames('code-with-language-selector__tab', {
              'code-with-language-selector__tab--active': language === activeLanguage,
            })}
            onClick={() => setActiveLanguage(language)}
            type="button"
          >
            {getLanguageName(language)}
          </button>
        ))}
      </div>
      <div className="code-with-language-selector__content">
        {activeCodeBlock && (
          <CodeBlock language={activeCodeBlock.language}>
            {activeCodeBlock.code}
          </CodeBlock>
        )}
      </div>
    </div>
  );
};

export default CodeWithLanguageSelector;