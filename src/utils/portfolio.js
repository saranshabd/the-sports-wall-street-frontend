import axios from "utils/axios";

export function sellAll(teamId) {
  return axios.post(`/portfolio/${teamId}/sellAll`);
}

export function buyStocks(teamId, stocksCount, buyingPrice) {
  return axios.post(`/portfolio/${teamId}/buy/`, { stocksCount, buyingPrice });
}
