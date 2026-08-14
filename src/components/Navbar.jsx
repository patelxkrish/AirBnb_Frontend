import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { suggestLocations } from "../api/listings";

function Navbar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setSuggestions([]);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      try {
        setSuggestions(await suggestLocations(value));
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="fs-6 text-center border-bottom fixed-top">
      <nav className="navbar navbar-expand-lg bg-body container-md">
        <div className="container-fluid position-relative">
          <Link className="navbar-brand text-danger" to="/">
            <i className="fs-2 me-4 fa-solid fa-compass position-absolute top-0 start-0 mt-2"></i>
          </Link>

          <form
            className="d-flex ms-4 mt-1 position-relative"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search Destination"
              aria-label="Search"
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-outline-danger rounded-pill" type="submit">
              Search
            </button>

            {suggestions.length > 0 && (
              <ul className="list-group position-absolute mt-5 w-100">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setQuery(s);
                      setSuggestions([]);
                      navigate(`/search?q=${s}`);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 position-absolute top-0 end-0">
              <li className="nav-item">
                <Link className="nav-link active fw-lighter" to="/">
                  Explore
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item ms-2">
                    <Link className="nav-link active fw-lighter" to="/NewList">
                      AirBnb Your Home
                    </Link>
                  </li>
                  <li className="nav-item ms-2 fw-semibold">
                    <button
                      className="nav-link active btn btn-link text-danger"
                      onClick={handleLogout}
                    >
                      Signout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-2 fw-semibold">
                    <Link className="nav-link active" to="/Signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item ms-2 fw-semibold">
                    <Link className="nav-link active" to="/Login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
