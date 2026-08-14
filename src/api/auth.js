import client from "./client";

export async function login({ username, password }) {
  const res = await client.post("/login", { username, password });
  return res.data.user;
}

export async function signup({ username, email, password }) {
  const res = await client.post("/signup", { username, email, password });
  return res.data.user;
}

export async function logout() {
  await client.post("/logout");
}

export async function fetchCurrentUser() {
  const res = await client.get("/me");
  return res.data.user;
}
