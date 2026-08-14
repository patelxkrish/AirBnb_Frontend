import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationPicker from "./LocationPicker";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../constants";

function validate({ title, price, locationName, file, requireImage }) {
  const errors = {};
  if (!title.trim()) errors.title = "Title is required.";
  if (!price || price <= 0) errors.price = "Price must be positive.";
  if (!locationName) errors.location = "Please pick a location on the map.";
  if (requireImage && !file) errors.file = "Image is required.";
  return errors;
}

/**
 * Shared form for both creating and editing a listing.
 *
 * @param {object} initialValues - { title, description, price, location, country }
 * @param {[number, number]} initialCoords - starting map center
 * @param {boolean} requireImage - true when an image must be uploaded (create flow)
 * @param {string} heading - page heading text
 * @param {string} submitLabel - submit button text
 * @param {(payload) => Promise<void>} onSubmit - called with { title, description, price, locationName, country, file }
 */
function ListingForm({
  initialValues = {},
  initialCoords = DEFAULT_MAP_CENTER,
  requireImage = false,
  heading,
  submitLabel,
  onSubmit,
}) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [price, setPrice] = useState(initialValues.price || "");
  const [locationName, setLocationName] = useState(initialValues.location || "");
  const [country, setCountry] = useState(initialValues.country || "");
  const [file, setFile] = useState(null);
  const [coords, setCoords] = useState(initialCoords);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleLocationPicked = ({ coords: pickedCoords, displayName, country: pickedCountry }) => {
    setCoords(pickedCoords);
    setLocationName(displayName);
    setCountry(pickedCountry);
    setErrors((prev) => ({ ...prev, location: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate({ title, price, locationName, file, requireImage });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({ title, description, price, locationName, country, file });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-md" style={{ marginTop: "6%", marginBottom: "6%" }}>
      <form onSubmit={handleSubmit}>
        <h1 className="mb-3 pb-3">{heading}</h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            {requireImage ? "Upload Image" : "Change Image"}
          </label>
          <input
            type="file"
            id="image"
            className={`form-control ${errors.file ? "is-invalid" : ""}`}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.file && <div className="invalid-feedback">{errors.file}</div>}
        </div>

        <div className="row">
          <div className="col-4 mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          <div className="col-8 mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input type="text" id="country" className="form-control" value={country} readOnly />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            value={locationName}
            readOnly
          />
          {errors.location && <div className="invalid-feedback">{errors.location}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Pick Location on Map</label>
          <MapContainer center={coords} zoom={DEFAULT_MAP_ZOOM} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {locationName && <Marker position={coords} />}
            <LocationPicker onLocationPicked={handleLocationPicked} />
          </MapContainer>
        </div>

        <button type="submit" className="btn btn-dark" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </button>
      </form>
    </div>
  );
}

export default ListingForm;
