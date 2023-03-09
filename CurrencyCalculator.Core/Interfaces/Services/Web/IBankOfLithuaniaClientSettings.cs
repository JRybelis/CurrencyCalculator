namespace CurrencyCalculator.Core.Interfaces.Services.Web;
public interface IBankOfLithuaniaClientSettings
{
    string? BaseUrl { get; }
    string RequestUrl { get; set; }
    string Host { get; }
}