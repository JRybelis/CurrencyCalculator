using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;

namespace CurrencyCalculator.Core.Interfaces.Services.Web;
public interface IResultParser
{
    List<CurrencyDto> ParseXmlStringToGetCurrenciesDtos(string responseString);
    List<EurExchangeRateDto> ParseXmlStringToGetEurExchangeRateDtos(string responseString);
}