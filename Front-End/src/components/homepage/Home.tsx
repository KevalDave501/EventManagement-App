import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h2>Welcome to the Event Management App</h2>
        <p>Plan, organize, and manage your events seamlessly.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  );
}

export default Home;
