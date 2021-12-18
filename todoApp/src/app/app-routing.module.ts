import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActiveTodoComponent} from "./active-todo/active-todo.component";
import {InActiveTodoComponent} from "./in-active-todo/in-active-todo.component";
import {TodoItemComponent} from "./active-todo/todo-item/todo-item.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {EditTodoComponent} from "./active-todo/edit-todo/edit-todo.component";

const routes: Routes = [
  {path: '', redirectTo: 'activeTodo', pathMatch: 'full'},
  {path: 'activeTodo', component: ActiveTodoComponent, children: [
      {path: 'new', component: EditTodoComponent},
      {path: ':id', component: TodoItemComponent}
  ]},
  {path: 'deletedTodo', component: InActiveTodoComponent},
  {path: 'not-found', component: ErrorPageComponent},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
