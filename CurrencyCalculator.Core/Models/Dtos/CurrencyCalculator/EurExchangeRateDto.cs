namespace CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
public class EurExchangeRateDto
{
    public DateTime Date { get; set; }
    public CurrencyAmount EurCurrencyDetails { get; set; } = default!;
    public CurrencyAmount ForeignCurrencyDetails { get; set; } = default!;
}