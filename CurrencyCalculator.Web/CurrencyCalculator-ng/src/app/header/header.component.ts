import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Currency } from '../currencies/currency';
import {CURRENCY} from './header.component.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnChanges {

  @Input() currencies: Currency[] = [];
  @Output() onDateChange = new EventEmitter();

  minDate: Date;
  state = {
    selectedCurrencyFrom:'',
    selectedCurrencyTo:'',
    currencyAmount: 0,
    date: null
  };

  constructor () {
    this.minDate = new Date("2015-01-01")
  };

  ngOnChanges(changes: SimpleChanges): void {
  }

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
    console.log(this.state);
    if(CURRENCY_TO !== CURRENCY.EUR){
      this.state.selectedCurrencyFrom = 'EUR';
    }
  }

  passDate(eventData: MatDatepickerInputEvent<Date>): void {
    let dateValue = this.formShortDateString(eventData);

    this.onDateChange.emit(dateValue);
  };

  formShortDateString(eventData: MatDatepickerInputEvent<Date>): string {
    const year: string = '' + eventData?.value?.getFullYear();

    let month: string = '';
    if (eventData.value?.getMonth()) {
      month = '' + (eventData.value?.getMonth() + 1);
      if (month.length < 2) {
        month = '0' + month;
      }
    }

    let day: string = '' + eventData.value?.getDate();
    if (day.length < 2) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  }
}
