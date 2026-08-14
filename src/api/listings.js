import client from "./client";

export async function getAllListings() {
  const res = await client.get("/allListings");
  return res.data;
}

export async function getListing(id) {
  const res = await client.get(`/listing/${id}`);
  return res.data;
}

export async function createListing(formData) {
  const res = await client.post("/newlist", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.listing;
}

export async function updateListing(id, formData) {
  const res = await client.post(`/listing/${id}/edit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteListing(id) {
  await client.delete(`/listing/${id}/delete`);
}

export async function searchListings(query) {
  const res = await client.get("/search", { params: { q: query } });
  return res.data;
}

export async function suggestLocations(query) {
  const res = await client.get("/suggest", { params: { q: query } });
  return res.data;
}
