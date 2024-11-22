export interface IFetchAllPricesResponse {
  cryptocurrencys: [
    { name: string; symbol: string; price: number; lastUpdated: string }
  ];
}
