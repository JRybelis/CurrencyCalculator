using CurrencyCalculator.Core.Interfaces.Services;
using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
using CurrencyCalculator.Core.Interfaces.Services.Validators;
using CurrencyCalculator.Core.Interfaces.Services.Web;

namespace CurrencyCalculator.Core.Services;
public class CurrencyCalculatorService : ICurrencyCalculatorService
{
    private readonly IDateValidation _dateValidation;
    private readonly IBankOfLithuaniaClient _client;

    public CurrencyCalculatorService(IDateValidation dateValidation, IBankOfLithuaniaClient client)
    {
        _dateValidation = dateValidation;
        _client = client;
    }

    public async Task<List<CurrencyDto>?> GetCurrencies()
    {
        var currencyList = await _client.GetCurrencies();

        return currencyList;
    }

    public async Task<List<EurExchangeRateDto>?> GetEurExchangeRatesByDate(DateTime date)
    {
        _dateValidation.IsDateValid(date);

        var selectedDateEurExchangeRates = await _client.GetEurExchangeRatesByDate(date);
        
        return selectedDateEurExchangeRates;
    }

    public async Task<EurExchangeRateDto?> GetSpecifiedEurExchangeRateByDate(DateTime date, string foreignCurrency)
    {
        var selectedDateEurExchangeRates = await GetEurExchangeRatesByDate(date);
        var specifiedSelectedDateEurExchangeRate = selectedDateEurExchangeRates?.
            Where(exr => exr.ForeignCurrencyDetails.Currency == foreignCurrency).FirstOrDefault();

        return specifiedSelectedDateEurExchangeRate;
    }

    public decimal? CalculateCurrencyExchangeValue(decimal amount, string currencyName, 
        string exchangeCurrencyName, List<EurExchangeRateDto> eurExchangeRates)
        {
            decimal? exchangeValue = null;
            if (currencyName == "EUR")
            {
                exchangeValue = CalculateEurExchangeValue(eurExchangeRates, amount, exchangeCurrencyName);
            } else 
            {
                exchangeValue = CalculateForeignCurrencyExchangeValue(eurExchangeRates, amount, currencyName);
            }

            return exchangeValue;
        }

    private decimal? CalculateEurExchangeValue(List<EurExchangeRateDto> eurExchangeRates, decimal convertedCurrencyAmount, 
        string exchangeCurrencyName)
    {
        var foreignCurrency = eurExchangeRates.Where(fc => fc.ForeignCurrencyDetails.Currency == exchangeCurrencyName)
            .FirstOrDefault()?.ForeignCurrencyDetails;

        return convertedCurrencyAmount * foreignCurrency?.Rate;
    }

    private decimal? CalculateForeignCurrencyExchangeValue(List<EurExchangeRateDto> eurExchangeRates, decimal convertedCurrencyAmount, 
        string foreignCurrencyName)
        {
            var foreignCurrency = eurExchangeRates.Where(fc => fc.ForeignCurrencyDetails.Currency == foreignCurrencyName)
            .FirstOrDefault()?.ForeignCurrencyDetails;

            return convertedCurrencyAmount / foreignCurrency?.Rate;
        }
}