import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'; // Make sure this path is correct

const Navbar = () => {
  return (
    // Class names kept for reference, but styling is primarily in Navbar.css
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          MicroStartupX
        </Link>
        {/* TODO: Add mobile menu toggle button here if needed */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/add-project" className="navbar-link">Add Project</Link>
          {/* Changed from /projectdetails as it needs an ID */}
          <Link to="/projectdetails" className="navbar-link">Explore Projects</Link> 
          <Link to ="/projectpage"className="navbar-link">ProjiectPage</Link>
          
          {/* Separator could be added here if needed */}
          <div className="navbar-auth-links"> {/* Optional grouping */}
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;