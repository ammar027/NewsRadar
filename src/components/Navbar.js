import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export class Navbar extends Component {
  constructor(props) {
    super(props);

    // Initialize darkMode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';

    this.state = {
      darkMode: savedDarkMode,
    };
  }

  componentDidMount() {
    // Apply dark mode class on initial render
    if (this.state.darkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode = () => {
    this.setState(prevState => {
      const newMode = !prevState.darkMode;
      document.body.classList.toggle('dark-mode', newMode);

      // Save to localStorage
      localStorage.setItem('darkMode', newMode);

      return { darkMode: newMode };
    });
  };

  render() {
    const categories = ['sport', 'business', 'politics', 'technology', 'science', 'culture', 'lifestyle'];
    const { selectedCountry, onCountryChange } = this.props;
    const { darkMode } = this.state;

    return (
      <div>
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
          <div className="container-fluid">
            <NavLink className="nvbr navbar-brand mx-2" to="/">NR</NavLink>
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
              <div className="form-check form-switch  d-flex align-items-center">
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  id="darkModeToggle"
                  checked={darkMode}
                  onChange={this.toggleDarkMode}
                />
                <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
