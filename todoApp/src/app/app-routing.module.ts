import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActiveTodoComponent} from "./active-todo/active-todo.component";
import {InActiveTodoComponent} from "./in-active-todo/in-active-todo.component";

const routes: Routes = [
  {path: '', redirectTo: 'activeTodo', pathMatch: 'full'},
  {path: 'activeTodo', component: ActiveTodoComponent},
  {path: 'deletedTodo', component: InActiveTodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
