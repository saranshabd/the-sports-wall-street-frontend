import axios from "utils/axios";
import { useQuery } from "react-query";

export function usePortfolio() {
  async function handler() {
    const { data } = await axios.get(`/portfolio/`);
    return data;
  }
  return useQuery(`portfolio`, handler, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
