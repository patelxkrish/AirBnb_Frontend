import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteListing } from "../api/listings";

function ListingDetail({ listing }) {
  const navigate = useNavigate();
  const { currUser } = useAuth();
  const isOwner = currUser?._id === listing.ownerId;

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      `Delete "${listing.title}"? This will also remove its reviews and can't be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteListing(listing._id);
      navigate("/");
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Error deleting listing");
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "25rem",
        margin: "5% auto",
        border: "none",
        marginBottom: "0%",
      }}
    >
      <h3 className="card-title">{listing.title}</h3>

      <img
        src={listing.image.url}
        className="card-img-top"
        alt={listing.title}
        style={{
          borderRadius: "6%",
          height: "20rem",
          objectFit: "cover",
        }}
      />

      <div className="card-body ps-1 fw-medium">
        <p>{listing.description}</p>
        <p>₹ {listing.price?.toLocaleString("en-IN")}</p>
        <p>{listing.location}</p>
        <p>{listing.country}</p>
      </div>

      {isOwner && (
        <span>
          <Link to={`/listing/${listing._id}/edit`} state={{ listing }}>
            <button className="btn btn-dark me-2">Edit</button>
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </span>
      )}

      <hr />
    </div>
  );
}

export default ListingDetail;
