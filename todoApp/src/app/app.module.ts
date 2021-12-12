import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveTodoComponent } from './active-todo/active-todo.component';
import { InActiveTodoComponent } from './in-active-todo/in-active-todo.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderItemComponent } from './header/header-item/header-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ActiveTodoComponent,
    InActiveTodoComponent,
    NewTodoComponent,
    HeaderComponent,
    HeaderItemComponent,
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
