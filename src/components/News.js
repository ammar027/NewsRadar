import React, { Component } from 'react';
import Spinner from './Spinner';
import NewsItem from './NewsItem';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.setState({ page: 1 }, () => this.updateNews());
    }
  }

  async updateNews() {
    const { page } = this.state;
    const { pageSize, category } = this.props;
    this.setState({ loading: true });

    try {
      let url = `https://content.guardianapis.com/search?q=${encodeURIComponent('India')}&section=${encodeURIComponent(category || 'technology')}&api-key=fc1bcc18-1f19-47e4-84ff-1aa40910d98b&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText`;
      let response = await fetch(url);
      let parsedData = await response.json();

      this.setState({
        articles: parsedData.response.results,
        loading: false,
        totalResults: parsedData.response.total,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  handlePrevClick = () => {
    this.setState(
      (state) => ({ page: Math.max(state.page - 1, 1) }),
      () => this.updateNews()
    );
  };

  handleNextClick = () => {
    const { pageSize } = this.props;
    const totalPages = Math.ceil(this.state.totalResults / pageSize);

    if (this.state.page < totalPages) {
      this.setState(
        (state) => ({ page: Math.min(state.page + 1, totalPages) }),
        () => this.updateNews()
      );
    }
  };

  render() {
    const { pageSize } = this.props;
    const totalPages = Math.ceil(this.state.totalResults / pageSize);
    const { page, loading, articles } = this.state;

    return (
      <div className="container my-4">
        <h2 className="text-center">NewsMonkey</h2>
        <h3 className="text-center">Top Headlines</h3>

        {loading && <Spinner />}
        <div className="row my-3 mx-2">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4 news-item" key={element.id}>
                <NewsItem
                  title={element.webTitle ? element.webTitle.slice(0, 56) : ""}
                  description={element.fields.trailText ? element.fields.trailText.slice(0, 78) : ""}
                  imageUrl={element.fields.thumbnail || "https://via.placeholder.com/150"}
                  newsUrl={element.webUrl}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-center my-5">
          <button
            disabled={page <= 1}
            type="button"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= totalPages}
            type="button"
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
