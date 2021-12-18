import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveTodoComponent } from './active-todo/active-todo.component';
import { InActiveTodoComponent } from './in-active-todo/in-active-todo.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { TodoItemComponent } from './active-todo/todo-item/todo-item.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditTodoComponent } from './active-todo/edit-todo/edit-todo.component';
import { ListTodoComponent } from './active-todo/list-todo/list-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    ActiveTodoComponent,
    InActiveTodoComponent,
    NewTodoComponent,
    HeaderComponent,

    TodoItemComponent,
    ErrorPageComponent,
    EditTodoComponent,
    ListTodoComponent,
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
