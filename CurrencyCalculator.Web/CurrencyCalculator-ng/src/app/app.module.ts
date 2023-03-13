import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { ExchangeRateService } from './services/exchange-rate.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { CurrencyComponent } from './currencies/currency.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ExchangeRatesComponent,
    NavComponent,
    HeaderComponent,
    CurrencyComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [
    ExchangeRateService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
