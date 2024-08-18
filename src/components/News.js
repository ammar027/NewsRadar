import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const { page } = this.state;
    this.setState({ loading: true, error: null });

    try {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b27ebcb963a348a389dd714443cec497
      &page=${page}&pageSize=18`;
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let parsedData = await response.json();

      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
      });

    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, error: error.message });
    }
  }

  handlePrevClick = () => {
    this.setState(
      (state) => ({ page: Math.max(state.page - 1, 1) }),
      () => this.updateNews()
    );
  };

  handleNextClick = () => {
    const totalPages = Math.ceil(this.state.totalResults / 18);
    
    if (this.state.page < totalPages) {
      this.setState(
        (state) => ({ page: Math.min(state.page + 1, totalPages) }),
        () => this.updateNews()
      );
    }
  };

  render() {
    const totalPages = Math.ceil(this.state.totalResults / 18);
    const { page, loading, articles, error } = this.state;

    return (
      <div className="container my-5">
        <h1 className="d-flex justify-content-center my-5">
          NewsMonkey - Top Headlines
        </h1>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        <div className="row my-5">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-center my-5">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= totalPages}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
