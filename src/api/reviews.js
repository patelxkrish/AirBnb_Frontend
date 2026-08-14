import client from "./client";

export async function addReview(listingId, { rating, comment }) {
  const res = await client.post(`/listing/${listingId}/reviews`, {
    rating,
    comment,
  });
  return res.data.review;
}

export async function updateReview(listingId, reviewId, { rating, comment }) {
  const res = await client.put(
    `/listing/${listingId}/reviews/${reviewId}`,
    { rating, comment },
  );
  return res.data.review;
}

export async function deleteReview(listingId, reviewId) {
  await client.delete(`/listing/${listingId}/reviews/${reviewId}`);
}
