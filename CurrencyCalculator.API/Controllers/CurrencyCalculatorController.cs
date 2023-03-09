using CurrencyCalculator.Core.Models.Dtos.CurrencyCalculator;
using CurrencyCalculator.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyCalculator.API.Controllers;


/// <summary>
/// Handles API requests for EUR currency exchange rates from bank of Lithuania
/// </summary>
[Route("lb/currencyCalculator/")]
public class CurrencyCalculatorController : ControllerBase
{
    private readonly ICurrencyCalculatorService _currencyCalculatorService;

    public CurrencyCalculatorController(ICurrencyCalculatorService currencyCalculatorService)
    {
        _currencyCalculatorService = currencyCalculatorService;
    }

    [HttpGet("GetAllCurrencies")]
    public async Task<ActionResult<List<CurrencyDto>>> GetCurrencies()
    {
        var result = await _currencyCalculatorService.GetCurrencies();

        if (result is null)
            return NotFound();
        
        return result;
    }

    [HttpGet("GetEurExchangeRatesByDate")]
    public async Task<ActionResult<List<EurExchangeRateDto>>> GetEurExchangeRatesByDate(DateTime date)
    {
        var result = await _currencyCalculatorService.GetEurExchangeRatesByDate(date);

        if (result is null)
            return NotFound();
        
        return result;
    }
}
