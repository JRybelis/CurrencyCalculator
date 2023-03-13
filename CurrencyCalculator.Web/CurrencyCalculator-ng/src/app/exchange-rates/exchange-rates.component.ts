import { Component, OnInit } from '@angular/core';
import { ExchangeRate, UserSelectedExchangeDetails } from './exchange-rate.utils';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { MessageService } from '../services/message.service';
import { Currency } from '../currencies/currency';
import { CURRENCY } from '../header/header.component.utils';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  providers: [ExchangeRateService],
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit{
  calculatedAmountTwoDecimalPlaces: string | undefined;
  currencyArray: Currency[] = [];
  currencyConversionDetails: UserSelectedExchangeDetails = {} as UserSelectedExchangeDetails;
  displayShortDate: string | undefined;
  exchangeRate: ExchangeRate | undefined;
  show: boolean = false;

  constructor(private exchangeRateService: ExchangeRateService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  emitToChild(currencies: Currency[]):void{
    this.currencyArray = currencies;
  };

  calculateExchangeRate(formData: UserSelectedExchangeDetails): void {
    let foreignCurrency = this.identifyForeignCurrency(formData);
    this.displayShortDate = this.exchangeRateService.formShortDateString(formData.date);
    this.readCurrencyConversionDetails(formData);
    this.showExchangeRequestDescription();

    this.exchangeRateService.getExchangeRateByDate(formData.date, foreignCurrency)
      .subscribe((exchangeRate: ExchangeRate) => {
        this.updateNotFoundResponseMessages();
        this.exchangeRate = exchangeRate;
      });

    this.exchangeRateService.getCalculatedCurrencyExchangeValue(formData)
      .subscribe((calculatedAmount: number) => {
        let calculatedAmountAsString = calculatedAmount.toString();
        this.calculatedAmountTwoDecimalPlaces = calculatedAmountAsString.substring(0, calculatedAmountAsString.indexOf('.')+3);
      })
  }

  updateNotFoundResponseMessages(){
    const WRONG_FOREIGN_CURRENCY_ERROR_MESSAGE: string =
      'The foreign currency you provided has no euro exchange rates for the date selected. Please try another currency.';

    if (this.messageService.messages.length > 0) {
      debugger
      for (let index = 0; index < this.messageService.messages.length; index++) {
        let element: string = this.messageService.messages[index];
        if (element.includes('failed: server returned code 404 with body "null"')) {
          element = WRONG_FOREIGN_CURRENCY_ERROR_MESSAGE;
        }
      }
    }
  }

  readCurrencyConversionDetails(formData: UserSelectedExchangeDetails): void {
    this.currencyConversionDetails.selectedCurrencyFrom = formData.selectedCurrencyFrom;
    this.currencyConversionDetails.selectedCurrencyTo = formData.selectedCurrencyTo;
    this.currencyConversionDetails.currencyAmount = formData.currencyAmount;
    this.currencyConversionDetails.date = formData.date;
  }

  identifyForeignCurrency(formData: UserSelectedExchangeDetails): string {
    if(formData.selectedCurrencyFrom !== CURRENCY.EUR) {
      return formData.selectedCurrencyFrom;
    }

    return formData.selectedCurrencyTo;
  }

  showExchangeRequestDescription(): void{
    this.show = !this.show;
  }
}
