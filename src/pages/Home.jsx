import React, { useEffect, useState } from "react";
import ListingGrid from "../components/ListingGrid";
import { getAllListings } from "../api/listings";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings()
      .then(setListings)
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div className="container" style={{ marginTop: "6%" }}>
      <ListingGrid listings={listings} emptyMessage="No listings yet." />
    </div>
  );
}

export default Home;
