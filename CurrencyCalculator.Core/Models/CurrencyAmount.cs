namespace CurrencyCalculator.Core.Models;
public class CurrencyAmount
{
    public string Currency { get; set; } = default!;
    public decimal Amount { get; set; }
}