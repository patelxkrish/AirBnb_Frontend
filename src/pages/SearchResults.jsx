import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListingGrid from "../components/ListingGrid";
import { searchListings } from "../api/listings";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchListings(query)
      .then(setResults)
      .catch((err) => console.error("Search failed:", err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return <div className="container mt-5">Loading results...</div>;
  }

  return (
    <div className="container pt-5 mt-5">
      <ListingGrid listings={results} emptyMessage={`No listings found for "${query}".`} />
    </div>
  );
}

export default SearchResults;
