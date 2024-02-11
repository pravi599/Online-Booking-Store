import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Online Bookstore</h1>
      <div className="grid-container">
        <div className="grid-item">
          <h2>Fiction</h2>
          <p>Explore captivating stories that ignite your imagination.</p>
        </div>
        <div className="grid-item">
          <h2>Non-Fiction</h2>
          <p>Discover factual and informative books on various subjects.</p>
        </div>
        <div className="grid-item">
          <h2>Thriller</h2>
          <p>Experience heart-pounding suspense and thrilling adventures.</p>
        </div>
        <div className="grid-item">
          <h2>Mystery</h2>
          <p>Uncover hidden secrets and solve intriguing puzzles.</p>
        </div>
      </div>
      <div className="view-all-books">
  <Link to="/GetAllBooks" className="link">
    View All Books
  </Link>
</div>

    </div>
  );
};

export default Home;
