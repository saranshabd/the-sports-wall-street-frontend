import axios from "utils/axios";

export function sellAll(teamId) {
  return axios.post(`/portfolio/${teamId}/sellAll`);
}
