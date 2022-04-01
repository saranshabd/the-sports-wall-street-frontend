import axios from "utils/axios";
import { useQuery } from "react-query";

export function useGlobalRankings() {
  async function handler() {
    const { data } = await axios.get("/portfolio/rankings/");
    return data;
  }
  return useQuery("globalRankings", handler, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
