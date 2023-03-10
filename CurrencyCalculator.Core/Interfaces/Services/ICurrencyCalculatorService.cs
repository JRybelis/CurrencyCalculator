using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;

namespace CurrencyCalculator.Core.Interfaces.Services;
public interface ICurrencyCalculatorService
{
    Task<List<CurrencyDto>?> GetCurrencies();
    Task<List<EurExchangeRateDto>?> GetEurExchangeRatesByDate(DateTime date);
    Task<EurExchangeRateDto?> GetSpecifiedEurExchangeRateByDate(DateTime date, string foreignCurrency);
    decimal? CalculateCurrencyExchangeValue(decimal amount, string currency, 
        string exchangeCurrency, List<EurExchangeRateDto> eurExchangeRates);
}