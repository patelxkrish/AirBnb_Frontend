import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForm";
import { getListing, updateListing } from "../api/listings";
import { forwardGeocode } from "../api/geocode";
import { DEFAULT_MAP_CENTER } from "../constants";

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

function ListEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routerState = useLocation().state;

  const [listing, setListing] = useState(routerState?.listing || null);
  const [initialCoords, setInitialCoords] = useState(DEFAULT_MAP_CENTER);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Resolve the listing: use router state if we navigated here via the Edit
  // button, otherwise fetch by ID (covers a page refresh or direct link).
  useEffect(() => {
    let cancelled = false;

    async function resolveListing() {
      try {
        const data = listing || (await getListing(id));
        if (cancelled) return;
        setListing(data);

        if (data.location) {
          const coords = await forwardGeocode(data.location);
          if (!cancelled && coords) setInitialCoords([coords.lat, coords.lng]);
        }
      } catch (err) {
        console.error("Error loading listing for edit:", err);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    resolveListing();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      await updateListing(id, buildFormData(payload));
      navigate(`/listing/${id}`);
    } catch (err) {
      console.error("Error updating listing:", err);
      alert("Error updating listing");
    }
  };

  if (loading) {
    return <p className="container-md" style={{ marginTop: "6%" }}>Loading listing…</p>;
  }

  if (loadError || !listing) {
    return (
      <p className="container-md text-danger" style={{ marginTop: "6%" }}>
        Couldn't load this listing for editing.
      </p>
    );
  }

  return (
    <ListingForm
      heading="Edit Your Listing"
      submitLabel="Update Listing"
      initialValues={listing}
      initialCoords={initialCoords}
      onSubmit={handleSubmit}
    />
  );
}

export default ListEdit;
