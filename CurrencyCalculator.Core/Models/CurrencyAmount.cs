namespace CurrencyCalculator.Core.Models;
public class CurrencyRate
{
    public string Currency { get; set; } = default!;
    public decimal Rate { get; set; }
}