import React from 'react';
import Link from '@docusaurus/Link';

interface InlineCalloutContainerProps {
  children: React.ReactNode;
}

interface InlineCalloutProps {
  children: React.ReactNode;
  icon: string;
  bold: string;
  href: string;
  isExternalLink?: boolean;
}

export const InlineCalloutContainer: React.FC<InlineCalloutContainerProps> = ({ children }) => {
  return <div className="custom-inline-callout-container">{children}</div>;
};

export const InlineCallout: React.FC<InlineCalloutProps> = ({ 
  children, 
  icon, 
  bold, 
  href, 
  isExternalLink = false 
}) => {
  const linkProps = isExternalLink 
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: href };

  return (
    <Link {...linkProps} className="custom-inline-callout">
      <div className="custom-inline-callout__icon">
        <span>{icon}</span>
      </div>
      <div className="custom-inline-callout__content">
        <div className="custom-inline-callout__bold">{bold}</div>
        <div className="custom-inline-callout__description">{children}</div>
      </div>
    </Link>
  );
};