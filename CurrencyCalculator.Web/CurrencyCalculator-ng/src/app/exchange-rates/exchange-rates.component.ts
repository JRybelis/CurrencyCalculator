import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { ExchangeRate } from './exchange-rate';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency } from '../currencies/currency';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  providers: [ExchangeRateService],
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit{
  exchangeRates: ExchangeRate[] = [];
  currencyArray: Currency[] = [];

  constructor(private exchangeRateService: ExchangeRateService){ }

  ngOnInit(): void {
  }

  emitToChild(currencies: Currency[]):void{
    this.currencyArray = currencies;
  };

  // getExchangeRatesByDate(exchangeRateDate: string): void {
  //   this.exchangeRateService.getExchangeRatesByDate(exchangeRateDate)
  //     .subscribe((exchangeRates: ExchangeRate[]) => {
  //       this.exchangeRates = exchangeRates;
  //     });
  // }
}
