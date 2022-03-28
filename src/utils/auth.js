import axios from "utils/axios";

export function signIn(userId) {
  return axios.post("/auth/signIn/", { userId });
}

export function signOut() {
  window.gtag("event", "logout"); // Google Analytics
  return axios.post("/auth/signOut/");
}
