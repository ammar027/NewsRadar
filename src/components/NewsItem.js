import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date }) => {
  return (
    <div>
      <img src={imageUrl} alt="News" />
      <h2 className="newsitm">{title}..</h2>
      <p>{description}...</p>
      <p className="card-text">
        <small className="">
          By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
        </small>
      </p>
      <a className="btn btn-sm btn-dark" href={newsUrl} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsItem;
