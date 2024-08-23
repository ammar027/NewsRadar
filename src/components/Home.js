import React, { useState, useEffect, useCallback } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import News from "./News";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = ({ selectedCountry, setProgress }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [stockInfo, setStockInfo] = useState(null);
  const [stockChangePositive, setStockChangePositive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Fetch stock information
  const fetchStockInfo = useCallback(async () => {
    const API_KEY = process.env.REACT_APP_STOCK_API_KEY;
    const stockSymbol = "AAPL";
    const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const stockInfo = {
        name: stockSymbol,
        price: data.c.toFixed(2),
        change: data.d.toFixed(2),
        changePercent: data.dp.toFixed(2) + "%",
      };

      setStockInfo(stockInfo);
      setStockChangePositive(data.d >= 0);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStockInfo();
    if (setProgress) {
      setProgress(100); // Update progress to 100% when Home page loads
    }
  }, [fetchStockInfo, setProgress]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Additional logic for search can be added here
  };

  // List of countries to exclude from showing in the title
  const excludedCountries = ["India", "US", "UK", "Australia", "Canada", "Africa"];
  const titlePrefix = excludedCountries.includes(selectedCountry) ? "" : `${selectedCountry} `;

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="current-info-container">
          <div className="hero">
            <h1 className="home-title">NewsRadar</h1>
            <p className="home-subtitle">
              Your one-stop destination for the latest news across the globe
            </p>
          </div>

          <div className="current-info-stock">
            <div className="current-info">
              <p>Current Time: {currentTime}</p>
            </div>
            {stockInfo && (
              <div className="stock-info">
                <p>
                  {stockInfo.name}: ${stockInfo.price}
                  <span
                    style={{
                      color: stockChangePositive ? "green" : "red",
                    }}
                  >
                    {stockChangePositive ? "▲" : "▼"}
                    {stockInfo.change} ({stockInfo.changePercent})
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        <ScrollLink to="highlights" smooth={true} duration={100}>
          <button className="btn btn-dark hero-button">Explore Now</button>
        </ScrollLink>
      </div>

      <Element name="highlights" className="categories-section">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-bar-container">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </form>

        <div className="categories-grid">
          <News
            setProgress={setProgress}
            pageSize={18}
            country={selectedCountry}
            category="world"
            searchQuery={searchQuery}
            titlePrefix={titlePrefix}
          />
        </div>
      </Element>
    </div>
  );
};

export default Home;
