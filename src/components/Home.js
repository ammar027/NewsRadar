import React, { Component } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import News from './News';

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="hero-section">
          <h1 className="home-title">NewsMonkey</h1>
          <p className="home-subtitle">Your one-stop destination for the latest news across the globe</p>
          <ScrollLink to="highlights" smooth={true} duration={100}>
            <button className="btn btn-dark hero-button">Explore Now</button>
          </ScrollLink>
        </div>
        <Element name="highlights" className="categories-section">
          <h2 className="categories-title">Latest Highlights</h2>
          <div className="categories-grid">
            <News pageSize={6} country={this.props.selectedCountry} category="world" />
          </div>
        </Element>
      </div>
    );
  }
}

export default Home;
