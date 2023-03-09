using System.Globalization;
using System.Xml;
using CurrencyCalculator.Core.Interfaces.Services.Web;
using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
using Microsoft.Extensions.Logging;

namespace CurrencyCalculator.Core.Services.Web;
public class ResultParser : IResultParser
{
    private readonly ILogger<ResultParser> _logger;

    public ResultParser(ILogger<ResultParser> logger)
    {
        _logger = logger;
    }

    public List<CurrencyDto> ParseXmlStringToGetCurrenciesDtos(string responseString)
    {
        var response = new List<CurrencyDto>();
        var xmlDocument = new XmlDocument();

        xmlDocument.LoadXml(responseString);
        if (xmlDocument.DocumentElement is null) return response;

        var currencies = xmlDocument.LastChild;
        var currencyItems = currencies.ChildNodes;

        try
        {
            foreach (XmlElement currencyItem in currencyItems)
                response.Add(PopulateCurrencyDto(currencyItem));

        }
        catch (Exception ex)
        {
            _logger.LogDebug("{ExInnerException} caused {ExMessage}", ex.InnerException, ex.Message);
            throw;
        }

        return response;
    }

    private static CurrencyDto PopulateCurrencyDto(XmlNode currencyItem)
    {
        var currencyDto = new CurrencyDto();

        foreach (XmlElement element in currencyItem.ChildNodes)
        {
            switch (element.LocalName)
            {
                case "Ccy":
                    currencyDto.Currency = element.InnerText;
                    break;
                case "CcyNm":
                    if (element.Attributes[0].Name == "lang" && element.Attributes[0].Value == "LT")
                        currencyDto.DescriptionLt = element.InnerText;

                    if (element.Attributes[0].Name == "lang" && element.Attributes[0].Value == "EN")
                        currencyDto.DescriptionEn = element.InnerText;
                    break;
            }
        }

        return currencyDto;
    }
}