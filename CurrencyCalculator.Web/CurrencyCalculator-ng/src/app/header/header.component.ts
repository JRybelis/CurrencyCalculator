import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  requestForm: FormGroup;
  imageSource: string = '/assets/currencies.jpg';
  message: string = 'Converts your selected currency and amount to another currency, for the specified date. One of the exchanged currencies must be euro';
  minDate: Date;
  state: UserSelectedExchangeDetails = {
    selectedCurrencyFrom: '',
    selectedCurrencyTo: '',
    currencyAmount: 0,
    date: new Date
  };


  public get selectedCurrencyFrom() {
    return this.requestForm.get('selectedCurrencyFrom');
  }

  public get selectedCurrencyTo() {
    return this.requestForm.get('selectedCurrencyTo');
  }

  public get currencyAmount() {
    return this.requestForm.get('currencyAmount');
  }

  public get date() {
    return this.requestForm.get('date');
  }


  constructor () {
    this.minDate = new Date("2015-01-01")
  };

  ngOnInit() : void {
    this.requestForm = new FormGroup({
      selectedCurrencyFrom: new FormControl(null, Validators.required),
      selectedCurrencyTo: new FormControl(null, Validators.required),
      currencyAmount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    })
  }

  isFormInvalid(): boolean {
    if (this.requestForm.invalid) {
      return true;
    }
    return false;
  }

  IsNumeric(input: any)
  {
    return (input - 0) == input && (''+input).trim().length > 0;
  }

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
