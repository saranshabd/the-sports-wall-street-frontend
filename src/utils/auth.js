import axios from "utils/axios";

export function signIn(tokenId) {
  return axios.post("/auth/signIn/", { tokenId });
}
