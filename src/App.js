import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import { useParams } from 'react-router-dom';

const NewsWithCategory = (props) => {
  const { categoryName } = useParams();
  return <News pageSize={18} country="India" category={categoryName} />;
};

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News pageSize={"18"} country="India" category="technology" />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryName" element={<NewsWithCategory />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
