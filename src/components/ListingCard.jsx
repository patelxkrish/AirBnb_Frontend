import React from "react";
import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="listing-link"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card h-100" style={{ border: "none" }}>
        {listing.image?.url && (
          <img
            src={listing.image.url}
            className="card-img-top"
            alt={listing.title}
            style={{
              height: "17rem",
              objectFit: "cover",
              borderRadius: "6%",
            }}
          />
        )}
        <div className="card-body pt-1 ps-1">
          <p className="card-text">
            <b>{listing.title}</b>
            <br />₹ {listing.price.toLocaleString("en-IN")}/night
            <i className="tax-info">&nbsp;&nbsp;+18% GST</i>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
