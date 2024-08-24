import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ selectedCountry, onCountryChange }) => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    matchMedia.addEventListener('change', handleSystemThemeChange);

    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('theme', theme);

    return () => {
      matchMedia.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const handleToggleChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'custom-dark-mode' : 'custom-light-mode'} navbar-sticky`}>
      <div className="container-fluid">
        <div className="navbar-brand mx-2">NR</div>
        <div className="theme-toggle">
          <div
            className={`toggle-track ${theme}`}
            onClick={() => handleToggleChange(theme === 'dark' ? 'light' : (theme === 'light' ? 'system' : 'dark'))}
          >
            <div className="toggle-thumb" />
          </div>
          <FontAwesomeIcon
            icon={faSun}
            className={`icon sun ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleToggleChange('light')}
          />
          <FontAwesomeIcon
            icon={faAdjust}
            className={`icon system ${theme === 'system' ? 'active' : ''}`}
            onClick={() => handleToggleChange('system')}
          />
          <FontAwesomeIcon
            icon={faMoon}
            className={`icon moon ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleToggleChange('dark')}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
