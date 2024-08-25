import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ selectedCountry, onCountryChange }) => {
  const savedTheme = localStorage.getItem("theme") || "system";
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const applyTheme = () => {
      document.body.classList.remove("light-mode", "dark-mode", "system-mode");
      if (theme === "system") {
        const prefersDarkScheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.body.classList.add(
          prefersDarkScheme ? "dark-mode" : "light-mode"
        );
      } else {
        document.body.classList.add(`${theme}-mode`);
      }
      localStorage.setItem("theme", theme);
    };

    applyTheme();

    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        const prefersDarkScheme = e.matches;
        document.body.classList.toggle("dark-mode", prefersDarkScheme);
        document.body.classList.toggle("light-mode", !prefersDarkScheme);
      }
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const categories = [
    "sport",
    "business",
    "politics",
    "technology",
    "science",
    "culture",
    "lifestyle",
    "music",
  ];

  return (
    <nav className={`navbar navbar-expand-lg ${theme}-mode navbar-sticky`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand mx-2" to="/">
          NR
        </NavLink>
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
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={`/${category}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>

          <select
            className={`form-select ${theme}-mode border-0 d-none d-lg-block`}
            onChange={(e) => onCountryChange(e.target.value)}
            value={selectedCountry}
            style={{ width: "80px" }} // Adjust width for mobile
          >
            <option value="India" title="India">🇮🇳</option>
            <option value="Usa" title="United States">🇺🇸</option>
            <option value="Uk" title="United Kingdom">🇬🇧</option>
            <option value="AU" title="Australia">🇦🇺</option>
            <option value="Canada" title="Canada">🇨🇦</option>
            <option value="Africa" title="South Africa">🇿🇦</option>
            <option value="Pakistan" title="Pakistan">🇵🇰</option>
            <option value="China" title="China">🇨🇳</option>
            <option value="Sweden" title="Sweden">🇸🇪</option>
          </select>
        </div>

        <div className="d-flex align-items-center ms-1 d-lg-none">
          <select
            className={`form-select ${theme}-mode border-0`}
            onChange={(e) => onCountryChange(e.target.value)}
            value={selectedCountry}
            style={{ width: "80px" }} // Adjust width for mobile
          >
            <option value="India" title="India">🇮🇳</option>
            <option value="Usa" title="United States">🇺🇸</option>
            <option value="Uk" title="United Kingdom">🇬🇧</option>
            <option value="AU" title="Australia">🇦🇺</option>
            <option value="Canada" title="Canada">🇨🇦</option>
            <option value="Africa" title="South Africa">🇿🇦</option>
            <option value="Pakistan" title="Pakistan">🇵🇰</option>
            <option value="China" title="China">🇨🇳</option>
            <option value="Sweden" title="Sweden">🇸🇪</option>
          </select>
        </div>

        <div className="theme-toggle align-items-center ms-1">
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleThemeChange}
          />
          <label htmlFor="light">
            <FontAwesomeIcon icon={faSun} />
          </label>

          <input
            type="radio"
            id="system"
            name="theme"
            value="system"
            checked={theme === "system"}
            onChange={handleThemeChange}
          />
          <label htmlFor="system">
            <FontAwesomeIcon icon={faAdjust} />
          </label>

          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={handleThemeChange}
          />
          <label htmlFor="dark">
            <FontAwesomeIcon icon={faMoon} />
          </label>

          <div className={`toggle-thumb ${theme}`} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
