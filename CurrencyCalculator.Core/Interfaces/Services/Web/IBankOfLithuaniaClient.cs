using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;

namespace CurrencyCalculator.Core.Interfaces.Services.Web;
public interface IBankOfLithuaniaClient
{
    Task<List<CurrencyDto>?> GetCurrencies();
}