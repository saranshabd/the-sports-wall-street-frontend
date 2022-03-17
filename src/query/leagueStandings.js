import axios from "utils/axios";

import { useQuery } from "react-query";

export function useLeagueStandings() {
  return useQuery("leagueStandings", async () => {
    const { data } = await axios.get("/teamStanding/all/");
    return data;
  });
}
