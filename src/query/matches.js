import axios from "utils/axios";

import { useQuery } from "react-query";

export function useUpcomingMatches() {
  return useQuery("upcomingMatches", async () => {
    const { data } = await axios.get('/match/upcoming/');
    return data;
  });
}
