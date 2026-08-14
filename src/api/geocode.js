import axios from "axios";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

export async function reverseGeocode(lat, lng) {
  const res = await axios.get(`${NOMINATIM_BASE}/reverse`, {
    params: { lat, lon: lng, format: "json" },
  });
  return {
    displayName: res.data.display_name,
    country: res.data.address?.country,
  };
}

export async function forwardGeocode(query) {
  const res = await axios.get(`${NOMINATIM_BASE}/search`, {
    params: { q: query, format: "json" },
  });
  if (!res.data.length) return null;
  const { lat, lon } = res.data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}
