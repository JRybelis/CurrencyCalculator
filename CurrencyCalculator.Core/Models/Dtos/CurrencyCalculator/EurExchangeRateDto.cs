namespace CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
public class EurExchangeRateDto
{
    public DateTime Date { get; set; }
    public CurrencyRate EurCurrencyDetails { get; set; } = default!;
    public CurrencyRate ForeignCurrencyDetails { get; set; } = default!;
}