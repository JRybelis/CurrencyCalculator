using CurrencyCalculator.Core.Interfaces.Services.Validators;
using System.Globalization;

namespace CurrencyCalculator.Core.Validation;
public class DateValidation : IDateValidation
{
    private const string MINIMUM_ACCEPTED_QUERY_DATE = 
        "This service only accepts requests for the period from the 1st of January, 2015.";

    private const string NO_DATE_PROVIDED = 
        "This service requires a date to execute. Please supply a date, prior to the 31st of December, 2014.";
    
    private const string INCORRECT_DATE_FORMAT = "Unable to convert the date provided to a valid date.";

    private readonly DateTime _minAcceptedDate = new DateTime(2015, 01, 01).Date;

    public void IsDateValid(DateTime dateTime)
    {
        var dateString = dateTime.ToString("O", CultureInfo.InvariantCulture).Substring(0, 10);

        if (string.IsNullOrWhiteSpace(dateString) || dateString == "0001-01-01 00:00:00")
            // No date, throw exception.
            throw new ArgumentNullException(NO_DATE_PROVIDED);

        if (!DateTime.TryParse(dateString, out var date))
            // Not a valid date, throw exception.
            throw new ArgumentException(INCORRECT_DATE_FORMAT);

        if(date > _minAcceptedDate)
            // Below minimum accepted date, throw exception
            throw new ArgumentOutOfRangeException(MINIMUM_ACCEPTED_QUERY_DATE);
    }
}