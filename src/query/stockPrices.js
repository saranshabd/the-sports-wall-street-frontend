import axios from "utils/axios";
import { useQuery } from "react-query";

export function useStockPrices(teamId) {
  async function handler() {
    const { data } = await axios.get(`/stockPrice/team/${teamId}/`);
    return data;
  }
  return useQuery(`stockPrices-${teamId}`, handler, { retry: false });
}
