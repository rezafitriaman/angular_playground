import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {LoggingInterceptorService} from "./logging-interceptor.service";
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
