import axios from "utils/axios";
import { useQuery } from "react-query";

export function useLeagueStandings() {
  async function handler() {
    const { data } = await axios.get("/teamStanding/all/");
    return data;
  }
  return useQuery("leagueStandings", handler, { retry: false });
}
