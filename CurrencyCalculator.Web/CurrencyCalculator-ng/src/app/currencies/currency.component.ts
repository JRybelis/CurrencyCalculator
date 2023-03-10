import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency } from './currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  providers: [ExchangeRateService],
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit{
  dataSource: Currency[] = [];
  displayedColumns: string[] = ['Currency short name', 'Description in Lithuanian', 'Description in English']

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  getCurrencyList(): void {
    this.exchangeRateService.getCurrencyList().subscribe((currencies: Currency[]) => {
      this.dataSource = currencies;
      console.info(currencies);
    });
  }
}
