using CurrencyCalculator.Core.Interfaces.Services.Web;

namespace CurrencyCalculator.Core.Services.Web;
public class BankOfLithuaniaClientSettings : IBankOfLithuaniaClientSettings
{
    public string? BaseUrl { get; set; }
    public string RequestUrl { get; set; } = default!;
    public string Host { get; set; } = default!;
}