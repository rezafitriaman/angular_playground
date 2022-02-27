import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveTodoComponent } from './active-todo/active-todo.component';
import { InactiveTodoComponent } from './inactive-todo/inactive-todo.component';

import { TodoItemComponent } from './active-todo/todo-item/todo-item.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditTodoComponent } from './active-todo/edit-todo/edit-todo.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuardService } from './active-todo/can-deactivate-guard.service';
import { TodoItemResolverService } from './active-todo/todo-item/todo-item-resolver.service';
import { AccountComponent } from './account/account.component';

import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';

const routes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' }, // set this if u need to login
    //{ path: '', redirectTo: 'activeTodo/0', pathMatch: 'full' }, // redirect to login
    {
        path: 'account',
        component: AccountComponent,
        children: [
            { path: 'login', component: SignInComponent },
            { path: 'signup', component: SignUpComponent },
        ],
    },
    {
        path: 'activeTodo',
        canActivate: [AuthGuardService],
        component: ActiveTodoComponent,
        children: [
            {
                path: 'new',
                component: EditTodoComponent,
                canDeactivate: [CanDeactivateGuardService],
            },

            {
                path: ':id',
                component: TodoItemComponent,
                canDeactivate: [CanDeactivateGuardService],
                resolve: { activeTodoItem: TodoItemResolverService },
            },
        ],
    },
    {
        path: 'deletedTodo',
        canActivate: [AuthGuardService],
        component: InactiveTodoComponent,
    },
    {
        path: 'not-found',
        component: ErrorPageComponent,
        data: { message: 'Page not found' },
    },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
