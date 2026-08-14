import axios from "axios";

// Set VITE_API_URL in a .env file to point at your backend in other
// environments. Falls back to localhost for local development.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

// Free-tier hosts (Render, etc.) spin the backend down when idle and can
// take 30-60s to wake back up on the next request. Rather than surface that
// as an error, we retry with backoff and let subscribers (see onWakingUp
// below) show a "waking up the server" message in the meantime.
const MAX_RETRIES = 8;
const RETRY_DELAY_MS = 4000;
const REQUEST_TIMEOUT_MS = 20000;

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Network errors (no response at all) and 502/503/504 all indicate the
// backend isn't up yet rather than a real failure, so those are worth
// retrying. Anything else (400, 401, 404, ...) is a real response and
// should be handled by the caller as usual.
function isRetryableError(error) {
  if (!error.response) return true;
  return [502, 503, 504].includes(error.response.status);
}

// Minimal pub/sub so any component can show a "waking up" indicator without
// prop-drilling retry state through every API call.
const listeners = new Set();
export function onWakingUp(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function setWaking(isWaking) {
  listeners.forEach((cb) => cb(isWaking));
}

client.interceptors.response.use(
  (response) => {
    setWaking(false);
    return response;
  },
  async (error) => {
    const config = error.config;
    if (!config) return Promise.reject(error);

    config.__retryCount = config.__retryCount || 0;

    if (isRetryableError(error) && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;
      setWaking(true);
      await sleep(RETRY_DELAY_MS);
      return client(config);
    }

    setWaking(false);
    return Promise.reject(error);
  },
);

export default client;
