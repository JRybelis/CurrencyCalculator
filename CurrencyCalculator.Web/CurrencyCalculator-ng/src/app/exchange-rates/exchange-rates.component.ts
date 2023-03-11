import { Component, OnInit } from '@angular/core';
import { ExchangeRate, UserSelectedExchangeDetails } from './exchange-rate.utils';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency } from '../currencies/currency';
import { CURRENCY } from '../header/header.component.utils';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  providers: [ExchangeRateService],
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit{
  exchangeRates: ExchangeRate[] = [];
  exchangeRate: ExchangeRate | undefined;
  currencyArray: Currency[] = [];

  constructor(private exchangeRateService: ExchangeRateService){ }

  ngOnInit(): void {
  }

  emitToChild(currencies: Currency[]):void{
    this.currencyArray = currencies;
  };

  calculateExchangeRate(formData: UserSelectedExchangeDetails): void {
    let foreignCurrency = this.identifyForeignCurrency(formData);
    this.exchangeRateService.getExchangeRateByDate(formData.date, foreignCurrency)
      .subscribe((exchangeRate: ExchangeRate) => {
        this.exchangeRate = exchangeRate;
      });
  }

  identifyForeignCurrency(formData: UserSelectedExchangeDetails): string {

    if(formData.selectedCurrencyFrom !== CURRENCY.EUR) {
      return formData.selectedCurrencyFrom;
    }

    return formData.selectedCurrencyTo;
  }
}
