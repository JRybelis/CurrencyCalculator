using CurrencyCalculator.Core.Interfaces.Services.Web;
using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
using Microsoft.Extensions.Logging;
using System.Globalization;
using System.Net;
using System.Net.Http.Headers;


namespace CurrencyCalculator.Core.Services.Web;
public class BankOfLithuaniaClient : IBankOfLithuaniaClient
{
    private IBankOfLithuaniaClientSettings ClientSettings { get; }
    private readonly ILogger<BankOfLithuaniaClient> _logger;
    private readonly IResultParser _resultParser;
    private HttpClient _httpClient;
    private Uri? _relativeUri;

    public BankOfLithuaniaClient(IBankOfLithuaniaClientSettings clientSettings,
    ILogger<BankOfLithuaniaClient> logger, IResultParser resultParser)
    {
        ClientSettings = clientSettings;
        _logger = logger;
        _resultParser = resultParser;
        _httpClient = GetClient();
    }

    private HttpClient GetClient()
    {
        _httpClient = new HttpClient(
            new HttpClientHandler
            {
                AllowAutoRedirect = true,
                MaxAutomaticRedirections = 5
            });

        _httpClient.BaseAddress = new Uri(ClientSettings.BaseUrl!, UriKind.Absolute);
        _httpClient.DefaultRequestHeaders.Accept.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("text/xml"));
        _httpClient.DefaultRequestHeaders.Host = ClientSettings.Host;
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13;

        return _httpClient;
    }
    public async Task<List<CurrencyDto>?> GetCurrencies()
    {
        var requestUrl = $"{ClientSettings.RequestUrl}getCurrencyList?";
        _relativeUri = new Uri(requestUrl, UriKind.Relative);
        var requestUri = new Uri(_httpClient.BaseAddress!, _relativeUri);

        _logger.LogInformation($"Requesting currency list from {requestUri.AbsoluteUri}.");
        var responseMessage = await MakeRestRequest(requestUri);
        var responseString = await responseMessage.Content.ReadAsStringAsync();

        _logger.LogInformation($"Parsing response string to {nameof(CurrencyDto)} objects.");
        return _resultParser.ParseXmlStringToGetCurrenciesDtos(responseString);
    }

    public async Task<List<EurExchangeRateDto>?> GetEurExchangeRatesByDate(DateTime date)
    {
        var dateString = date.ToString("O", CultureInfo.InvariantCulture).Substring(0, 10);
        var requestUrl = $"{ClientSettings.RequestUrl}getFxRates?tp=EU&dt={dateString}";
        _relativeUri = new Uri(requestUrl, UriKind.Relative);
        var requestUri = new Uri(_httpClient.BaseAddress!, _relativeUri);

        _logger.LogInformation($"Requesting Euro exchange rates for {dateString} from {requestUri.AbsoluteUri}.");
        var responseMessage = await MakeRestRequest(requestUri);
        var responseString = await responseMessage.Content.ReadAsStringAsync();

        _logger.LogInformation($"Parsing response string to {nameof(EurExchangeRateDto)} objects.");
        return _resultParser.ParseXmlStringToGetEurExchangeRateDtos(responseString);
    }

    private async Task<HttpResponseMessage> MakeRestRequest(Uri requestUri)
    {
        var request = new HttpRequestMessage
        {
            RequestUri = requestUri,
            Method = HttpMethod.Get,
            Headers = { Host = ClientSettings.Host}
        };

        var response = await _httpClient.SendAsync(request);
        var statusCode = (int)response.StatusCode;

        if (statusCode is >= 300 and <= 399)
        {
            var redirectUri = response.Headers.Location;
            if (!redirectUri.IsAbsoluteUri)
                redirectUri = new Uri(_httpClient.BaseAddress!, redirectUri);

            return await MakeRestRequest(redirectUri);
        }
        if (!response.IsSuccessStatusCode)
            throw new Exception();


        return response;
    }
}