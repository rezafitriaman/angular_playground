import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';
import { AccountService } from 'src/app/account/account.service';
import { ActiveTodoService } from '../active-todo.service';

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit, CanComponentDeactivate, OnDestroy {
    @ViewChild('addTodoForm') form: NgForm | undefined;
    public changesSaved: boolean = false;
    public loading: boolean = false;
    public subscription: Subscription | undefined;
    public subscriptionSetTodoListOnFireBase: Subscription | undefined;

    constructor(
        private todoService: TodoService,
        private route: ActivatedRoute,
        private router: Router,
        private dataStorage: DataStorageService,
        private accountService: AccountService,
        private activeTodoService: ActiveTodoService
    ) {}

    ngOnInit(): void {
        console.log('edit-todo component');
        this.subscription = this.todoService.isLoadingTodo.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    onSubmit() {
        // ? push the item to firebase
        const newTodo = this.form?.value.newTodo;
        if (newTodo === '') return;
        this.todoService.isLoadingTodo.next(true);
        this.subscriptionSetTodoListOnFireBase = this.dataStorage.setTodoListOnFireBase(new ActiveTodo(newTodo, []), 'activeTodos', 'post').subscribe(
            id => {
                this.todoService.addTodo(new ActiveTodo(newTodo, [], (id as {name: string}).name));
                this.router.navigate(['../', (id as {name: string}).name], {relativeTo: this.route});
                this.todoService.isLoadingTodo.next(false);

                this.form?.reset();
                this.changesSaved = true;
                this.activeTodoService.resetSlider.next(true);
            },
            errorMessage => {
                this.accountService.thereIsError.next(errorMessage);
            }
        );
    }

    canDeactivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.form?.value.newTodo !== '' && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        } else {
            return true;
        }
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.subscriptionSetTodoListOnFireBase?.unsubscribe();
    }
}
