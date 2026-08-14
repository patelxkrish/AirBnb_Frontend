import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingDetail from "../components/ListingDetail";
import Review from "../components/Review";
import { getListing } from "../api/listings";

function List() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  const fetchListing = useCallback(async () => {
    try {
      setListing(await getListing(id));
    } catch (err) {
      console.error("Error fetching listing:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  if (!listing) return <p>Loading...</p>;

  return (
    <>
      <ListingDetail listing={listing} />
      <Review listing={listing} refreshListing={fetchListing} />
    </>
  );
}

export default List;
