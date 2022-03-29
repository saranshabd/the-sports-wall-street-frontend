import axios from "utils/axios";
import { useQuery } from "react-query";

export function useUser() {
  async function handler() {
    const { data } = await axios.get(`/user/profile/`);
    return data;
  }
  return useQuery(`user`, handler, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
