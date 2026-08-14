import React, { useState } from "react";
import { updateReview, deleteReview } from "../api/reviews";

function RatingDisplay({
  rating,
  comment,
  author,
  reviewId,
  listingId,
  currUser,
  onReviewUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment);
  const [editRating, setEditRating] = useState(rating);

  const isOwner = currUser?._id === author?._id;

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this review? This can't be undone.");
    if (!confirmed) return;

    try {
      await deleteReview(listingId, reviewId);
      onReviewUpdated();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateReview(listingId, reviewId, { rating: editRating, comment: editComment });
      setIsEditing(false);
      onReviewUpdated();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="col-md-6 mb-3">
      <div className="card shadow-sm border">
        <div className="card-body">
          <h5 className="card-title">{author?.username || author}</h5>

          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <input
                type="number"
                min="1"
                max="5"
                value={editRating}
                onChange={(e) => setEditRating(Number(e.target.value))}
                className="form-control mb-2"
              />
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="form-control mb-2"
              />
              <button type="submit" className="btn btn-sm btn-success me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p className="starability-result card-text" data-rating={rating}></p>
              <p className="card-text">{comment}</p>
              {isOwner && (
                <div>
                  <button
                    className="btn btn-sm btn-outline-dark me-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RatingDisplay;
