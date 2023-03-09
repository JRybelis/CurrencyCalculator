using System.Xml;
using CurrencyCalculator.Core.Interfaces.Services.Web;
using CurrencyCalculator.Core.Models;
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

    public List<EurExchangeRateDto> ParseXmlStringToGetEurExchangeRateDtos(string responseString)
    {
        var response = new List<EurExchangeRateDto>();
        var xmlDocument = new XmlDocument();

        xmlDocument.LoadXml(responseString);
        if (xmlDocument.DocumentElement is null) return response;

        var eurExchangeRates = xmlDocument.LastChild;
        var eurExchangeRateItems = eurExchangeRates.ChildNodes;

        try
        {
            foreach (XmlElement eurExchangeRateItem in eurExchangeRateItems)
                response.Add(PopulateEurExchangeRateDto(eurExchangeRateItem));
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

    private static EurExchangeRateDto PopulateEurExchangeRateDto(XmlNode eurExchangeRateItem)
    {
        var eurExchangeRateDto = new EurExchangeRateDto
        {
            EurCurrencyDetails = new CurrencyAmount(),
            ForeignCurrencyDetails = new CurrencyAmount()
        };

        foreach (XmlElement element in eurExchangeRateItem.ChildNodes)
        {
            switch (element.LocalName)
            {
                case "Dt":
                    eurExchangeRateDto.Date = DateTime.Parse(element.InnerText);
                    break;
                case "CcyAmt":
                    if (element.FirstChild.InnerText == "EUR")
                    {
                        eurExchangeRateDto.EurCurrencyDetails.Currency = element.FirstChild.InnerText;
                        eurExchangeRateDto.EurCurrencyDetails.Amount = decimal.Parse(element.LastChild.InnerText);
                    } else
                    {
                        eurExchangeRateDto.ForeignCurrencyDetails.Currency = element.FirstChild.InnerText;
                        eurExchangeRateDto.ForeignCurrencyDetails.Amount = decimal.Parse(element.LastChild.InnerText);
                    }
                    break;
            }
        }

        return eurExchangeRateDto;
    }
}