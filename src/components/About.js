import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About NewsRadar</h1>
      <p className="about-description">
        NewsRadar is your go-to source for the latest headlines and breaking news from around the world. Our mission is to provide up-to-date and relevant news coverage in various categories, including technology, business, science, and more.
      </p>
      <p className="about-description">
        Powered by The Guardian API, NewsRadar brings you a curated selection of top stories to keep you informed and engaged. Whether you're interested in sports, culture, or the latest tech trends, we've got you covered.
      </p>
      <p className="about-description">
        Created and maintained by Ammar Multani, NewsRadar is committed to delivering a seamless news experience. Thank you for visiting NewsRadar. We hope you enjoy exploring the news and finding the stories that matter to you. Stay tuned for updates and new features!
      </p>

      <footer className="about-footer">
        <p>Connect with Ammar Multani:</p>
        <ul className="footer-links">
          <li>
            <a href="https://github.com/ammar027" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/ammar-multani/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          {/* <li>
            <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </li> */}
        </ul>
        <p>&copy; {new Date().getFullYear()} NewsRadar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
