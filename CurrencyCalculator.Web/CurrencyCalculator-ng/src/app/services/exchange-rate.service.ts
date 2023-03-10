import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExchangeRate } from "../exchange-rates/exchange-rate";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { Currency } from "../currencies/currency";

@Injectable()
export class ExchangeRateService{
  currencyCalculatorServiceUrl: string = 'https://localhost:7120/lb/currencyCalculator';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('ExchangeRateService');
  }

  // getExchangeRatesByDate(date: string): Observable<ExchangeRate[]> {
  //   date = date.trim();

  //   const options = date ? {params: new HttpParams().set('date', date)} : {};

  //   return this.http.get<ExchangeRate[]>(this.currencyCalculatorServiceUrl, options)
  //     .pipe(
  //       catchError(this.handleError<ExchangeRate[]>('getExchangeRatesByDate', []))
  //     );
  // }

  getCurrencyList(): Observable<Currency[]>{
    const requestUrl = this.currencyCalculatorServiceUrl + '/GetAllCurrencies';
    return this.http.get<Currency[]>(requestUrl)
      .pipe(catchError(this.handleError<Currency[]>('getCurrencyList', [])));
  }
}
