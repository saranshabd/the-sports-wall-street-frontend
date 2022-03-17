import axios from "utils/axios";

export function signIn(tokenId) {
  return axios.post("/auth/signIn/", { tokenId });
}

export function signOut() {
  return axios.post("/auth/signOut/");
}
