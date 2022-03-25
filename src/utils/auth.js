import axios from "utils/axios";

export function signIn(tokenId) {
  window.gtag("event", "login", { method: "Google" }); // Google Analytics
  return axios.post("/auth/signIn/", { tokenId });
}

export function facebookSignIn(accessToken) {
  window.gtag("event", "login", { method: "Facebook" }); // Google Analytics
  return axios.post("/auth/signIn/facebook/", { accessToken });
}

export function signOut() {
  window.gtag("event", "logout"); // Google Analytics
  return axios.post("/auth/signOut/");
}
