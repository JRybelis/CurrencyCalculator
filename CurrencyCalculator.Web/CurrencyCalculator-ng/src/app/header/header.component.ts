import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from '../currencies/currency';
import { UserSelectedExchangeDetails } from '../exchange-rates/exchange-rate.utils';
import {CURRENCY} from './header.component.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  @Input() currencies: Currency[] = [];
  @Output() submitExchangeRateRequest = new EventEmitter();

  minDate: Date;
  state: UserSelectedExchangeDetails = {
    selectedCurrencyFrom: '',
    selectedCurrencyTo: '',
    currencyAmount: 0,
    date: new Date
  };

  constructor () {
    this.minDate = new Date("2015-01-01")
  };

  ngOnInit() : void {
  }

  message: string = 'Converts your selected currency and amount to another currency, for the specified date. One of the exchanged currencies must be euro';
  imageSource: string = '/assets/currencies.jpg';

  checkCurrencyFrom(){
    const CURRENCY_FROM = this.state.selectedCurrencyFrom;
    if(CURRENCY_FROM !== CURRENCY.EUR){
      this.state.selectedCurrencyTo = 'EUR';
    }
  }

  checkCurrencyTo(){
    const CURRENCY_TO = this.state.selectedCurrencyTo;
    if(CURRENCY_TO !== CURRENCY.EUR){
      this.state.selectedCurrencyFrom = 'EUR';
    }
  }

  submitForm(): void {
    let isExchangingDifferentCurrencies = this.isEurExchangedAgainstNonEurCurrency();

    if (isExchangingDifferentCurrencies)
      this.submitExchangeRateRequest.emit(this.state);
  };

  isEurExchangedAgainstNonEurCurrency(): boolean
  {
    if (this.state.selectedCurrencyFrom === CURRENCY.EUR &&
        this.state.selectedCurrencyTo === CURRENCY.EUR)
          throw new Error
          ("Cannot convert Euro to Euro. Please select a foreign currency to convert against.");

    return true;
  }
}
