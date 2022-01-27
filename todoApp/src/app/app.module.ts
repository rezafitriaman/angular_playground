import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }
 from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveTodoComponent } from './active-todo/active-todo.component';
import { InactiveTodoComponent } from './inactive-todo/inactive-todo.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { TodoItemComponent } from './active-todo/todo-item/todo-item.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditTodoComponent } from './active-todo/edit-todo/edit-todo.component';
import { ListTodoComponent } from './active-todo/list-todo/list-todo.component';
import { AddNewTodoItemComponent } from './active-todo/todo-item/add-new-todo-item/add-new-todo-item.component';
import { HighlightDirective } from './shared/highlight.directive';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AccountComponent } from './account/account.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    ActiveTodoComponent,
    InactiveTodoComponent,
    HeaderComponent,
    TodoItemComponent,
    ErrorPageComponent,
    EditTodoComponent,
    ListTodoComponent,
    AddNewTodoItemComponent,
    HighlightDirective,
    LoginFormComponent,
    SignupFormComponent,
    AccountComponent,
    SignInComponent,
    SignUpComponent,
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
