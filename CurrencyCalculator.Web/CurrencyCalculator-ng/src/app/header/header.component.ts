import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { Currency } from '../currencies/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  @Input() currencies: Currency[] = [];
  minDate: Date;

  @Output() onDateChange = new EventEmitter();

  constructor () {
    this.minDate = new Date("2015-01-01")
  };

  ngOnInit() : void {
  }

  message: string = 'Returns a list containing exchange rates, as expressed in Litas per 1 currency unit, for the specified date.';
  imageSource: string = '/assets/currencies.jpg';

  checkIfEur(eventData: Event){
    <HTMLSelectElement>eventData.target
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
