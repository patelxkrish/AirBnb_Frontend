import React from "react";
import ListingCard from "./ListingCard";

function ListingGrid({ listings, emptyMessage = "No listings found." }) {
  if (!listings.length) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4 mt-1">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}

export default ListingGrid;
