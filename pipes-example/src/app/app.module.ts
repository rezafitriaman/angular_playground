import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { ReversePipe } from './reverse.pipe';
import { FilterAlphabetPipe } from './filter-alphabet.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    FilterAlphabetPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
