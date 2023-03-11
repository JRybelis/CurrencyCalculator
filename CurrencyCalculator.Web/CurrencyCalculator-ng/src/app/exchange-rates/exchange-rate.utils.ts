export interface ExchangeRate {
  date: string,
  eurCurrencyDetails: CurrencyDetails,
  foreignCurrencyDetails: CurrencyDetails,
  // unitDescription?: string,
  // quantity: number
}

export interface CurrencyDetails {
  currency?: string,
  rate: number
}

export interface UserSelectedExchangeDetails {
  selectedCurrencyFrom: string,
  selectedCurrencyTo: string,
  currencyAmount: number,
  date: Date
}
