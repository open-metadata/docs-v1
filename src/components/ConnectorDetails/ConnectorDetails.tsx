import React from 'react';
import Link from '@docusaurus/Link';

interface ConnectorDetailsHeaderProps {
  name: string;
  stage?: 'PROD' | 'BETA';
  platform?: 'OpenMetadata' | 'Collate';
  availableFeatures?: string[];
  unavailableFeatures?: string[];
  availableFeaturesCollate?: string[];
}

interface ConnectorInfoCardProps {
  name: string;
  stage?: 'PROD' | 'BETA';
  href: string;
  platform?: 'OpenMetadata' | 'Collate';
}

interface ConnectorsListContainerProps {
  children: React.ReactNode;
}

export const ConnectorDetailsHeader: React.FC<ConnectorDetailsHeaderProps> = ({
  name,
  stage = 'PROD',
  platform = 'OpenMetadata',
  availableFeatures = [],
  unavailableFeatures = [],
  availableFeaturesCollate = [],
}) => {
  return (
    <div className="connector-details-header">
      <div className="connector-details-header__main">
        <h1 className="connector-details-header__title">{name}</h1>
        <div className="connector-details-header__badges">
          <span className={`badge badge--${stage.toLowerCase()}`}>{stage}</span>
          <span className="badge badge--secondary">{platform}</span>
        </div>
      </div>
      
      {(availableFeatures.length > 0 || unavailableFeatures.length > 0) && (
        <div className="connector-details-header__features">
          <h3>Features</h3>
          
          {availableFeatures.length > 0 && (
            <div className="connector-features">
              <h4>Available Features</h4>
              <ul className="connector-features__list">
                {availableFeatures.map((feature, index) => (
                  <li key={index} className="connector-features__item connector-features__item--available">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {unavailableFeatures.length > 0 && (
            <div className="connector-features">
              <h4>Unavailable Features</h4>
              <ul className="connector-features__list">
                {unavailableFeatures.map((feature, index) => (
                  <li key={index} className="connector-features__item connector-features__item--unavailable">
                    ❌ {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {availableFeaturesCollate.length > 0 && (
            <div className="connector-features">
              <h4>Collate Only Features</h4>
              <ul className="connector-features__list">
                {availableFeaturesCollate.map((feature, index) => (
                  <li key={index} className="connector-features__item connector-features__item--collate">
                    🔥 {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ConnectorInfoCard: React.FC<ConnectorInfoCardProps> = ({
  name,
  stage = 'PROD',
  href,
  platform = 'OpenMetadata',
}) => {
  return (
    <Link to={href} className="custom-connector-card">
      <div className="custom-connector-card__content">
        <h3 className="custom-connector-card__title">{name}</h3>
        <div className="custom-connector-card__badges">
          <span className={`badge badge--${stage.toLowerCase()}`}>{stage}</span>
          <span className="badge badge--secondary">{platform}</span>
        </div>
      </div>
    </Link>
  );
};

export const ConnectorsListContainer: React.FC<ConnectorsListContainerProps> = ({ children }) => {
  return <div className="connectors-list-container">{children}</div>;
};