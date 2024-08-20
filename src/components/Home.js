import React, { Component } from "react";
import { Link as ScrollLink, Element } from "react-scroll";
import News from "./News";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
      stockInfo: null,
      stockChangePositive: true,
    };
  }

  componentDidMount() {
    this.updateTime();
    this.fetchStockInfo();
  }

  updateTime() {
    this.timeInterval = setInterval(() => {
      this.setState({ currentTime: new Date().toLocaleTimeString() });
    }, 1000);
  }

  async fetchStockInfo() {
    const API_KEY = "cr1of91r01qnqk1b8dvgcr1of91r01qnqk1b8e00";
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

      this.setState({
        stockInfo,
        stockChangePositive: data.d >= 0,
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  render() {
    const { currentTime, stockInfo, stockChangePositive } = this.state;
    return (
      <div className="home-container">
        <div className="hero-section">
          <div className="current-info-container">
            <div>
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
          <h2 className="categories-title">Latest Country Highlights</h2>
          <div className="categories-grid">
            <News
              pageSize={6}
              country={this.props.selectedCountry}
              category="world"
            />
          </div>
        </Element>
      </div>
    );
  }
}

export default Home;
