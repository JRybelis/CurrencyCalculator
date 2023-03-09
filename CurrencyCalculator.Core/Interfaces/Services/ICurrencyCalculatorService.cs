using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;

namespace CurrencyCalculator.Core.Interfaces.Services;
public interface ICurrencyCalculatorService
{
    Task<List<CurrencyDto>?> GetCurrencies();
}