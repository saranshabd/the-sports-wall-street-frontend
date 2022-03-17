import axios from "utils/axios";
import { useQuery } from "react-query";

export function usePortfolio() {
  async function handler() {
    const { data } = await axios.get(`/portfolio/`);
    return data;
  }
  return useQuery(`portfolio`, handler, { retry: false });
}
