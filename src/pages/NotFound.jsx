import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-dark">
      {/* Big 404 heading */}
      <h1 className="display-1 fw-bold text-danger mb-3">404</h1>

      {/* Subtitle */}
      <h2 className="fw-semibold mb-4">Oops! Page Not Found</h2>

      {/* Detailed message */}
      <p className="lead text-center mb-5 px-3">
        The page you’re looking for doesn’t exist, may have been moved, or is
        temporarily unavailable. Don’t worry — you can always head back to the
        homepage or explore other sections of our site.
      </p>

      {/* Helpful links */}
      <div className="d-flex gap-3">
        <Link to="/" className="btn btn-danger btn-lg rounded-pill px-4">
          Go Home
        </Link>
        <Link
          to="/NewList"
          className="btn btn-outline-danger btn-lg rounded-pill px-4"
        >
          Explore Listings
        </Link>
        <Link
          to="/Login"
          className="btn btn-outline-secondary btn-lg rounded-pill px-4"
        >
          Login
        </Link>
      </div>

      {/* Decorative section */}
      <div className="mt-5 text-muted text-center">
        <i className="fa-solid fa-compass fa-3x mb-3 text-danger"></i>
        <p>
          Lost in the digital wilderness? Let’s guide you back to familiar
          territory.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
