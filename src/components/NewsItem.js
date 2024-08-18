import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="News" />
      <h2 className="newsitm">{title}...</h2>
      <p>{description}...</p>
      <a href={newsUrl} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsItem;
