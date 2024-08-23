import React, { Component } from "react";
import Spinner from './Spinner';
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    this.fetchMoreDataDebounced = this.debounce(this.fetchMoreData, 300);
  }

  async componentDidMount() {
    this.updateNews(true);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.setState({ page: 1, articles: [] }, () => this.updateNews(true));
    }
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  async updateNews(isInitialLoad = false) {
    if (this.props.setProgress) {
      this.props.setProgress(10);  // If setProgress is passed, update progress
    }
  
    const { page } = this.state;
    const { pageSize, category, country, searchQuery } = this.props;
    this.setState({ loading: true });
  
    try {
      const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY; // Use the environment variable
      let url = `https://content.guardianapis.com/search?order-by=newest&q=${encodeURIComponent(
        searchQuery || country
      )}&section=${encodeURIComponent(
        category || "world"
      )}&api-key=${apiKey}&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText,byline,publication,webTitle,webUrl,webPublicationDate`;
  
      let response = await fetch(url);
      if (this.props.setProgress) {
        this.props.setProgress(30);  // If setProgress is passed, update progress
      }
      let parsedData = await response.json();
      if (this.props.setProgress) {
        this.props.setProgress(70);  // If setProgress is passed, update progress
      }
  
      this.setState((prevState) => ({
        articles: isInitialLoad ? parsedData.response.results : [...prevState.articles, ...parsedData.response.results],
        loading: false,
        totalResults: parsedData.response.total,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  
    if (this.props.setProgress) {
      this.props.setProgress(100);  // If setProgress is passed, update progress to 100
    }
  }
  

  fetchMoreData = async () => {
    this.setState(
      (state) => ({ page: state.page + 1 }),
      () => this.updateNews()
    );
  };

  render() {
    const { category } = this.props;
    const { articles } = this.state;

    // Determine the title based on the selected category
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const dynamicTitle = `Latest ${categoryTitle} Headlines`;

    return (
      <div className="container my-4">
        <h2 className="text-center">NR</h2>
        <h3 className="text-center">{dynamicTitle}</h3>

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreDataDebounced}
          hasMore={articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row my-3 mx-2">
            {articles.map((element, index) => (
              <div className="col-md-4 news-item" key={`${element.id}-${index}`}>
                <NewsItem
                  title={element.webTitle ? element.webTitle.slice(0, 89) : ""}
                  description={
                    element.fields.trailText
                      ? element.fields.trailText.slice(0, 128)
                      : ""
                  }
                  imageUrl={
                    element.fields.thumbnail ||
                    "https://via.placeholder.com/150"
                  }
                  newsUrl={element.webUrl}
                  author={element.fields.byline || "Unknown"}
                  date={element.webPublicationDate || "N/A"}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>

      </div>
    );
  }
}

export default News;
