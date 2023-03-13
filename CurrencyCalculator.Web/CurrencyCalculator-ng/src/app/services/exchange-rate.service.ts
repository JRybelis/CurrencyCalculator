import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExchangeRate, UserSelectedExchangeDetails } from "../exchange-rates/exchange-rate.utils";
import { HandleError, HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";
import { Currency } from "../currencies/currency";

@Injectable()
export class ExchangeRateService{
  currencyCalculatorServiceUrl: string = 'https://localhost:7120/lb/currencyCalculator';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler, private messageService: MessageService) {
      this.handleError = httpErrorHandler.createHandleError('ExchangeRateService');
  }

  getCurrencyList(): Observable<Currency[]>{
    const requestUrl = this.currencyCalculatorServiceUrl + '/GetAllCurrencies';
    return this.http.get<Currency[]>(requestUrl)
      .pipe(catchError(this.handleError<Currency[]>('getCurrencyList', [])));
  }

  getExchangeRateByDate(date: Date, foreignCurrency: string): Observable<ExchangeRate> {
    let dateString = this.formShortDateString(date);
    const requestUrl = this.currencyCalculatorServiceUrl + '/GetSpecifiedEurExchangeRateByDate';
    const options = date ? {params: new HttpParams()
      .set('date', dateString)
      .set('foreignCurrency', foreignCurrency)} : {};

    return this.http.get<ExchangeRate>(requestUrl, options)
      .pipe(catchError(this.handleError<ExchangeRate>('getExchangeRatesByDate')));
  }

  getCalculatedCurrencyExchangeValue(formData: UserSelectedExchangeDetails): Observable<number>{
    let dateString = this.formShortDateString(formData.date);
    const requestUrl = this.currencyCalculatorServiceUrl + '/CalculateCurrencyExchangeValue';
    const options = formData ? {params: new HttpParams()
      .set('amount', formData.currencyAmount)
      .set('currency', formData.selectedCurrencyFrom)
      .set('exchangeCurrency', formData.selectedCurrencyTo)
      .set('date', dateString)} : {};

    return this.http.get<number>(requestUrl, options)
      .pipe(catchError(this.handleError<number>('getCalculatedCurrencyExchangeValue')));
  }

  formShortDateString(date: Date): string {
    const year: string = '' + date?.getFullYear();

    let month: string = '';
    if (date?.getMonth()) {
      month = '' + (date?.getMonth() + 1);
      if (month?.length < 2) {
        month = '0' + month;
      }
    }

    let day: string = '' + date?.getDate();
    if (day?.length < 2) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  }
}
