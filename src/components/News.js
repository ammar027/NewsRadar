import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import NewsItem from "./NewsItem";
import BackToTopButton from "./BackToTopButton";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
      showBackToTop: false
    };
  }

  // Function to fetch news articles
  fetchMoreData = async (isNewSearch = false) => {
    if (this.state.loading) return;

    this.setState({ loading: true });
    if (this.props.setProgress) this.props.setProgress(30);

    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const { page } = this.state;
    const { searchQuery, country, category, pageSize } = this.props;
    const url = `https://content.guardianapis.com/search?section=${encodeURIComponent(
      category || "world"
    )}&order-by=newest&q=${encodeURIComponent(
      searchQuery || country
    )}&api-key=${apiKey}&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText,byline,publication,webTitle,webUrl,webPublicationDate`;

    try {
      console.log("Fetching data from URL:", url); // Debugging URL
      const response = await fetch(url);
      const parsedData = await response.json();

      console.log("Fetched data:", parsedData); // Debugging response

      this.setState(prevState => ({
        articles: isNewSearch
          ? parsedData.response.results
          : [...prevState.articles, ...parsedData.response.results],
        totalResults: parsedData.response.total,
        loading: false
      }));

      if (this.props.setProgress) this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  // Handle scroll for Back to Top button visibility
  handleScroll = () => {
    this.setState({ showBackToTop: window.scrollY > 300 });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchMoreData(true); // Initial fetch
  }

  componentDidUpdate(prevProps, prevState) {
    const { category, country, searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.category !== category || prevProps.country !== country || prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1 }, () => this.fetchMoreData(true));
    }

    if (prevState.page !== page && page > 1) {
      this.fetchMoreData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { articles, showBackToTop, totalResults } = this.state;
    const { category } = this.props;

    return (
      <div className="container my-4">
        <h2 className="text-center">NR</h2>
        <h3 className="text-center">{`Latest ${category.charAt(0).toUpperCase() + category.slice(1)} Headlines`}</h3>

        <InfiniteScroll
          dataLength={articles.length}
          next={this.loadMore}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row my-3 mx-2">
            {articles.map((element, index) => (
              <div className="col-md-4 news-item" key={`${element.id}-${index}`}>
                <NewsItem
                  title={element.webTitle ? element.webTitle.slice(0, 89) : ""}
                  description={
                    element.fields && element.fields.trailText
                      ? element.fields.trailText.slice(0, 128)
                      : ""
                  }
                  imageUrl={
                    element.fields && element.fields.thumbnail
                      ? element.fields.thumbnail
                      : "https://via.placeholder.com/150"
                  }
                  newsUrl={element.webUrl}
                  author={element.fields && element.fields.byline ? element.fields.byline : "Unknown"}
                  date={element.webPublicationDate || "N/A"}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {showBackToTop && <BackToTopButton />}
      </div>
    );
  }
}

export default News;
