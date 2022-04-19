import axios from "utils/axios";

export function updateUserProfile(username, givenName, familyName) {
  return axios.put("/user/profile/", { username, givenName, familyName });
}
