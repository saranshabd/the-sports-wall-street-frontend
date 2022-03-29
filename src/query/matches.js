import axios from "utils/axios";
import { useQuery } from "react-query";

export function useUpcomingMatches() {
  async function handler() {
    const { data } = await axios.get("/match/upcoming/");
    return data;
  }
  return useQuery("upcomingMatches", handler, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
