import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ selectedCountry, onCountryChange }) => {
  // Initialize darkMode from localStorage
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    // Apply dark mode class on initial render
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle('dark-mode', newMode);

      // Save to localStorage
      localStorage.setItem('darkMode', newMode);

      return newMode;
    });
  };

  const categories = ['sport', 'business', 'politics', 'technology', 'science', 'culture', 'lifestyle', 'music'];

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} navbar-sticky`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand mx-2" to="/">NR</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                to="/"
              >
                Home
              </NavLink>
            </li>
            {categories.map(category => (
              <li className="nav-item" key={category}>
                <NavLink
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                  to={`/${category}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>

          <select
            className={`form-select ${darkMode ? 'bg-dark text-white' : 'bg-light text-black'} border-0 ms-auto`}
            onChange={(e) => onCountryChange(e.target.value)}
            value={selectedCountry}
            style={{ width: "180px" }}
          >
            <option value="India">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Africa">Africa</option>
          </select>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input mx-2"
              type="checkbox"
              id="darkModeToggle"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
