import React from "react";
import { useAuth } from "../context/AuthContext";
import { addReview } from "../api/reviews";
import RatingInput from "./RatingInput";
import RatingDisplay from "./RatingDisplay";

function Review({ listing, refreshListing }) {
  const { currUser } = useAuth();

  const handleNewReview = async (review) => {
    try {
      await addReview(listing._id, review);
      refreshListing();
    } catch (err) {
      console.error("Error adding review:", err.response?.data || err.message);
      alert("Failed to add review. Please make sure you are logged in.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "40rem" }}>
      {currUser ? (
        <>
          <h4>Leave a Review</h4>
          <RatingInput onSubmit={handleNewReview} />
        </>
      ) : (
        <p className="text-muted">Login to leave a review.</p>
      )}

      <hr />
      <h4>All Reviews</h4>
      <div className="row">
        {listing.reviews?.length > 0 ? (
          listing.reviews.map((rev) => (
            <RatingDisplay
              key={rev._id}
              rating={rev.rating}
              comment={rev.comment}
              author={rev.author}
              reviewId={rev._id}
              listingId={listing._id}
              currUser={currUser}
              onReviewUpdated={refreshListing}
            />
          ))
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Review;
