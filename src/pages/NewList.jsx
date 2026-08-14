import React from "react";
import { useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForm";
import { createListing } from "../api/listings";

function buildFormData({ title, description, price, locationName, country, file }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("location", locationName);
  formData.append("country", country);
  if (file) formData.append("image", file);
  return formData;
}

function NewList() {
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    try {
      await createListing(buildFormData(payload));
      navigate("/");
    } catch (err) {
      console.error("Error creating listing:", err);
      alert("Error creating listing");
    }
  };

  return (
    <ListingForm
      heading="Create a New Listing"
      submitLabel="Submit"
      requireImage
      onSubmit={handleSubmit}
    />
  );
}

export default NewList;
