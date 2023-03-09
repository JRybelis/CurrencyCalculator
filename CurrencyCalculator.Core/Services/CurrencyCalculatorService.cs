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
}