import React, { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import NewsItem from "./NewsItem";
import BackToTopButton from "./BackToTopButton";

const News = ({ setProgress, pageSize, country, category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Debounce fetchMoreData function
  const fetchMoreData = useCallback(async () => {
    if (setProgress) setProgress(30);
    
    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    let url = `https://content.guardianapis.com/search?order-by=newest&q=${encodeURIComponent(
      searchQuery || country
    )}&section=${encodeURIComponent(
      category || "world"
    )}&api-key=${apiKey}&page=${page}&page-size=${pageSize}&show-fields=thumbnail,trailText,byline,publication,webTitle,webUrl,webPublicationDate`;
  
    try {
      let response = await fetch(url);
      if (setProgress) setProgress(50);
      let parsedData = await response.json();
      if (setProgress) setProgress(70);
  
      setArticles(prevArticles =>
        page === 1
          ? parsedData.response.results
          : [...prevArticles, ...parsedData.response.results]
      );
      setTotalResults(parsedData.response.total);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  
    if (setProgress) setProgress(100);
  }, [page, category, country, searchQuery, setProgress, pageSize]);

  useEffect(() => {
    fetchMoreData(); // Fetch data when component mounts or dependencies change
  }, [fetchMoreData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center">NR</h2>
      <h3 className="text-center">{`Latest ${category.charAt(0).toUpperCase() + category.slice(1)} Headlines`}</h3>

      <InfiniteScroll
        dataLength={articles.length}
        next={() => {
          setPage(prevPage => prevPage + 1);
          fetchMoreData();
        }}
        hasMore={articles.length < totalResults}
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

      {/* Include the BackToTopButton component */}
      {showBackToTop && <BackToTopButton />}
    </div>
  );
}

export default News;
