import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import { useParams } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'India' // Default country
    };
  }

  handleCountryChange = (country) => {
    this.setState({ country });
  }

  render() {
    return (
      <Router>
        <Navbar onCountryChange={this.handleCountryChange} />
        <Routes>
          <Route path="/" element={<News pageSize={18} country={this.state.country} category="technology" />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryName" element={<NewsWrapper pageSize={18} country={this.state.country} />} />
        </Routes>
      </Router>
    );
  }
}

const NewsWrapper = (props) => {
  const { categoryName } = useParams();
  return <News {...props} category={categoryName} />;
};

export default App;
