import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from '@docusaurus/router';
import { useVersions, useActiveVersion } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import { MdMenu, MdClose } from 'react-icons/md';
import './navbar-custom.css';

// Simple search component for now - can be enhanced with Algolia later
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // For now, redirect to a search page or implement basic search
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="navbar-search-form">
      <input
        type="text"
        placeholder="Search docs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="navbar-search-input"
      />
      <button type="submit" className="navbar-search-button" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </form>
  );
};

// Icon components matching TopNav
const SlackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.521V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const APIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.25 2.1l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3L12 21.9c-.2.2-.5.2-.7 0l-1.35-1c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3L11.3 2.1c-.2-.2-.5-.2-.7 0L9.25 3.1c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3L8.3 21.9c-.2.2-.5.2-.7 0L6.25 20.9c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3L5.3 2.1c-.2-.2-.5-.2-.7 0L3.25 3.1c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3L2.3 21.9c-.2.2-.5.2-.7 0c-.2-.2-.2-.5 0-.7L3.25 19.2c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L1.6 3.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0L3.65 4.1c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L2.3 20.1c-.2.2-.2.5 0 .7s.5.2.7 0L4.35 19.8c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L3.05 4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0L5.1 5.1c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L4.75 18.8c-.2.2-.2.5 0 .7s.5.2.7 0L6.8 18.5c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L6.5 5.5c-.2-.2-.2-.5 0-.7s.5-.2.7 0L8.55 5.8c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L8.2 18.5c-.2.2-.2.5 0 .7s.5.2.7 0L10.25 18.2c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L10 5.2c-.2-.2-.2-.5 0-.7s.5-.2.7 0L12.05 5.5c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L11.7 18.2c-.2.2-.2.5 0 .7s.5.2.7 0L13.75 17.9c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L13.5 4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0L15.55 5.1c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L15.25 18.5c-.2.2-.2.5 0 .7s.5.2.7 0L17.3 18.2c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L17 5.2c-.2-.2-.2-.5 0-.7s.5-.2.7 0L19.05 5.5c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L18.75 17.9c-.2.2-.2.5 0 .7s.5.2.7 0L20.8 17.6c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3l-.9-.7c-.1-.1-.15-.2-.15-.3s.05-.2.15-.3l.9-.7c.7-.6 1.05-1.4 1.05-2.3s-.35-1.7-1.05-2.3L20.45 4.5c-.2-.2-.2-.5 0-.7s.5-.2.7 0L22.5 4.8c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3l-.9.7c-.1.1-.15.2-.15.3s.05.2.15.3l.9.7c.7.6 1.05 1.4 1.05 2.3s-.35 1.7-1.05 2.3L22.2 17.3c-.2.2-.2.5 0 .7s.5.2.7 0c.2-.2.2-.5 0-.7L21.55 16.3c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3L22.9 3.1c.2-.2.2-.5 0-.7s-.5-.2-.7 0L20.85 3.4c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3L21.2 16.6c.2.2.2.5 0 .7s-.5.2-.7 0L19.15 16.3c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2-.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3L18.85 3.1c.2-.2.2-.5 0-.7s-.5-.2-.7 0L16.8 3.4c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3l.9.7c.1.1.15.2.15.3s-.05.2-.15.3l-.9.7c-.7.6-1.05 1.4-1.05 2.3s.35 1.7 1.05 2.3L17.15 15.9c.2.2.2.5 0 .7s-.5.2-.7 0L15.1 15.6c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3l.9-.7c.1-.1.15-.2.15-.3s-.05-.2-.15-.3l-.9-.7c-.7-.6-1.05-1.4-1.05-2.3s.35-1.7 1.05-2.3L15.45 2.8c.2-.2.2-.5 0-.7s-.5-.2-.7 0L14.25 2.1z"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
  </svg>
);

const OMDIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 2c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4z"/>
    <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/>
  </svg>
);

export default function CustomNavbar(): JSX.Element {
  const location = useLocation();
  const versions = useVersions('default');
  const activeVersion = useActiveVersion('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 600) {
        setShowMobileMenu(true);
      } else {
        setShowMobileMenu(false);
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleVersionChange = (version: string) => {
    const currentPath = location.pathname;
    const basePath = currentPath.replace(/^\/v[0-9]+\.[0-9]+\.x(-SNAPSHOT)?/, '');
    const newPath = version === '1.9.x' ? basePath : `/v${version}${basePath}`;
    window.location.href = newPath;
  };

  return (
    <nav className={`navbar navbar--fixed-top navbar-topnav ${isMenuOpen ? 'collapsed' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar-topnav__container">
          <div className="navbar-topnav__brand-section">
            <Link to="/" className="navbar-topnav__logo navbar__brand" aria-label="OpenMetadata Home">
              <OMDIcon />
              <span className="navbar-topnav__title navbar__title">OpenMetadata</span>
            </Link>
            {versions.length > 0 && (
              <div className="navbar-topnav__version-dropdown">
                <select
                  value={activeVersion?.name || '1.9.x'}
                  onChange={(e) => handleVersionChange(e.target.value)}
                  className="navbar-topnav__version-select"
                >
                  {versions.map((version) => (
                    <option key={version.name} value={version.name}>
                      {version.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {showMobileMenu && (
            <button
              className="navbar-topnav__toggle navbar__toggle"
              onClick={handleMenuToggle}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
            </button>
          )}
        </div>
        
        <div className="navbar-topnav__search">
          <SearchBox />
        </div>
        
        <div className="navbar-topnav__icons navbar__items navbar__items--right">
          <Link
            to="https://slack.open-metadata.org"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-topnav__icon navbar__item navbar__link"
            aria-label="Join Slack"
          >
            <SlackIcon />
          </Link>
          <Link
            to="https://github.com/open-metadata/OpenMetadata"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-topnav__icon navbar__item navbar__link"
            aria-label="GitHub Repository"
          >
            <GitHubIcon />
          </Link>
          <Link
            to="/swagger.html"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-topnav__icon navbar__item navbar__link"
            aria-label="API Documentation"
          >
            <APIIcon />
          </Link>
          <Link
            to="https://getcollate.io"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-topnav__cloud-btn navbar__item navbar__link"
            aria-label="Collate Cloud"
          >
            <CloudIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}