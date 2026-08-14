import React, { useState } from "react";
import "./starability.css"; // your CSS file

function RatingInput({ onSubmit }) {
  const [rating, setRating] = useState(1); // default to 1, not 0
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure rating is a number between 1–5
    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    onSubmit({ rating: numericRating, comment });

    // Reset form
    setRating(1);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <label className="form-label">Rating</label>
      <fieldset className="starability-slot">
        {[1, 2, 3, 4, 5].map((num) => (
          <React.Fragment key={num}>
            <input
              type="radio"
              id={`rate-${num}`}
              name="rating"
              value={num}
              checked={rating === num}
              onChange={() => setRating(num)}
              required
            />
            <label htmlFor={`rate-${num}`} title={`${num} star`}>
              {num} star
            </label>
          </React.Fragment>
        ))}
      </fieldset>

      <label className="form-label ">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-control"
        required
      />

      <button type="submit" className="btn btn-outline-dark mt-3">
        Submit
      </button>
    </form>
  );
}

export default RatingInput;
