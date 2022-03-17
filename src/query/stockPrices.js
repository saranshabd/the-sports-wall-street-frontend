import axios from 'utils/axios'

import { useQuery } from 'react-query'

export function useStockPrices(teamId) {
  return useQuery(`stockPrices-${teamId}`, async () => {
    const { data } = await axios.get(`/stockPrice/team/${teamId}/`)
    return data
  })
}
