import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Currency } from './currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  providers: [ExchangeRateService],
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit{
  @Output() currenciesOuput: EventEmitter<Currency[]> = new EventEmitter();

  dataSource: Currency[] = [];

  panelOpenState = false;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  getCurrencyList(): void {
    this.exchangeRateService.getCurrencyList().subscribe((currencies: Currency[]) => {
      this.dataSource = currencies;
      this.emitCurrencyListToParentElement();
    });
  }

  emitCurrencyListToParentElement(): void {
    this.currenciesOuput.emit(this.dataSource);
  }
}
