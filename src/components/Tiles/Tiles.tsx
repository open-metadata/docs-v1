import React from 'react';
import Link from '@docusaurus/Link';

interface TilesContainerProps {
  children: React.ReactNode;
}

interface TileProps {
  title: string;
  description: string;
  link: string;
  icon?: string;
  isExternalLink?: boolean;
}

export const TilesContainer: React.FC<TilesContainerProps> = ({ children }) => {
  return <div className="custom-tiles-container">{children}</div>;
};

export const Tile: React.FC<TileProps> = ({ 
  title, 
  description, 
  link, 
  icon, 
  isExternalLink = false 
}) => {
  const linkProps = isExternalLink 
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: link };

  return (
    <Link {...linkProps} className="custom-tile">
      {icon && (
        <div className="custom-tile__icon">
          {/* You can add icon rendering logic here */}
          <span>{icon}</span>
        </div>
      )}
      <div className="custom-tile__content">
        <h3 className="custom-tile__title">{title}</h3>
        <p className="custom-tile__description">{description}</p>
      </div>
    </Link>
  );
};