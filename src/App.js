import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import Home from "./components/Home";
import LoadingBar from "react-top-loading-bar";

class App extends Component {
  state = {
    selectedCountry: "India",
    selectedCategory: "technology",
    progress: 0
  };

  handleCountryChange = (country) => {
    this.setState({ selectedCountry: country });
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { selectedCountry, progress } = this.state;

    return (
      <Router>
        <Navbar onCountryChange={this.handleCountryChange} selectedCountry={selectedCountry} />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route path="/" element={<Home selectedCountry={selectedCountry} setProgress={this.setProgress} />} />
          <Route path="/technology" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="technology" />} />
          <Route path="/politics" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="politics" />} />
          <Route path="/business" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="business" />} />
          <Route path="/science" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="science" />} />
          <Route path="/sport" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="sport" />} />
          <Route path="/culture" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="culture" />} />
          <Route path="/lifestyle" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="lifeandstyle" />} />
          <Route path="/music" element={<News setProgress={this.setProgress} pageSize={39} country={selectedCountry} category="music" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
