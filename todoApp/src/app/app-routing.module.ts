import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActiveTodoComponent} from "./active-todo/active-todo.component";
import {InactiveTodoComponent} from "./inactive-todo/inactive-todo.component";
import {TodoItemComponent} from "./active-todo/todo-item/todo-item.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {EditTodoComponent} from "./active-todo/edit-todo/edit-todo.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {AuthGuardService} from "./auth-guard.service";
import {CanDeactivateGuardService} from "./active-todo/can-deactivate-guard.service";
import {TodoItemResolverService} from "./active-todo/todo-item/todo-item-resolver.service";
import {SignupFormComponent} from "./signup-form/signup-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // redirect to login
  {path: 'login', component: LoginFormComponent},
  {path: 'signup', component: SignupFormComponent},
  {path: 'activeTodo', canActivate: [AuthGuardService], component: ActiveTodoComponent, children: [
      {path: 'new', component: EditTodoComponent, canDeactivate: [CanDeactivateGuardService]},
      {path: ':id', component: TodoItemComponent, canDeactivate: [CanDeactivateGuardService], resolve: {activeTodoItem: TodoItemResolverService}}
  ]},
  {path: 'deletedTodo', canActivate: [AuthGuardService], component: InactiveTodoComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
