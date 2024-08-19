import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    const categories = ['sport', 'technology', 'business', 'science', 'culture', 'lifestyle'];
    const { selectedCountry, onCountryChange } = this.props;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="nvbr navbar-brand mx-3" to="/">NM</NavLink>
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
                  <NavLink className="nav-link" exact to="/">Home</NavLink>
                </li>
                {categories.map(category => (
                  <li className="nav-item" key={category}>
                    <NavLink
                      className="nav-link"
                      to={`/${category}`}
                      activeClassName="active"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </NavLink>
                  </li>
                ))}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
              </ul>
              <select
                className="form-select bg-light text-black border-0 ms-auto"
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
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
