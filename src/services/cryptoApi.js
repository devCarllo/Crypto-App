const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = `&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`;

const getCoinsList = (page, currency) =>
  `${BASE_URL}coins/markets?vs_currency=${currency}&per_page=15&page=${page}${API_KEY}`;

const searchCoin = (coin) => `${BASE_URL}search?query=${coin}${API_KEY}`;

const getAllData = () => `${BASE_URL}coins/markets?vs_currency=usd${API_KEY}`;

const getChart = (coin, currency) =>
  `${BASE_URL}coins/${coin}/market_chart?vs_currency=${currency}&days=7${API_KEY}`;

const getWithId = (id, currency) =>
  `${BASE_URL}coins/markets?vs_currency=${currency}&ids=${id}${API_KEY}`;

export { getCoinsList, searchCoin, getAllData, getChart, getWithId };
