import axios from "utils/axios";

export function signIn(userId, referredBy) {
  return axios.post("/auth/signIn/", { userId, referredBy });
}

export function signOut() {
  window.gtag("event", "logout"); // Google Analytics
  return axios.post("/auth/signOut/");
}

export function isLoading(resp) {
  return resp.isFetching && !resp.data;
}
