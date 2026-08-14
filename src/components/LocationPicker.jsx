import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { reverseGeocode } from "../api/geocode";

function LocationPicker({ onLocationPicked }) {
  const [marker, setMarker] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);

      try {
        const { displayName, country } = await reverseGeocode(lat, lng);
        onLocationPicked({ coords: [lat, lng], displayName, country });
      } catch (err) {
        console.error("Reverse geocode error:", err);
      }
    },
  });

  return marker ? <Marker position={marker} /> : null;
}

export default LocationPicker;
