import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TodoService } from '../../../todo.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-new-todo-item',
    templateUrl: './add-new-todo-item.component.html',
    styleUrls: ['./add-new-todo-item.component.css'],
})
export class AddNewTodoItemComponent implements OnInit, OnDestroy {
    @ViewChild('addItemForm') form: NgForm | undefined;
    @Output() newItem: EventEmitter<string> = new EventEmitter<string>();
    @Output() inputFillUp: EventEmitter<boolean | null | undefined> = new EventEmitter<boolean | null | undefined>();
    public inputValue: string = '';
    public subscription: Subscription | undefined;
    public subscriptionLoading: Subscription | undefined;
    public loading: boolean = false;

    constructor(private todoService: TodoService) {}

    ngOnInit(): void {
        this.subscription = this.todoService.resetPlaceHolder.subscribe((value: string) => {
            this.inputValue = value;
        });
        
        this.subscriptionLoading = this.todoService.isLoadingTodo.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    onSubmit() {
        const newItem = this.form?.value.newItem;
        if (newItem === '') return;
        this.newItem.emit(newItem);
        this.form?.reset();
        this.inputFillUp.emit(false);
    }

    onKeyDown() {
        this.inputFillUp.emit(this.form?.valid);
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.subscriptionLoading?.unsubscribe();
    }
}
