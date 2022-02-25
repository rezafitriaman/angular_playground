import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TodoService } from '../../../todo.service';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-new-todo-item',
    templateUrl: './add-new-todo-item.component.html',
    styleUrls: ['./add-new-todo-item.component.css'],
})
export class AddNewTodoItemComponent implements OnInit {
    @ViewChild('addItemForm') form: NgForm | undefined;
    @Output() newItem: EventEmitter<string> = new EventEmitter<string>();
    @Output() inputFillUp: EventEmitter<boolean | null | undefined> = new EventEmitter<
        boolean | null | undefined
    >();
    public inputValue: string = '';
    public subscription: Subscription = new Observable().subscribe();
    public subscription2: Subscription = new Observable().subscribe();
    public loading: boolean = false;

    constructor(private todoService: TodoService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.subscription = this.todoService.resetPlaceHolder.subscribe((value: string) => {
            this.inputValue = value;
        });
        this.subscription2 = this.todoService.loading.subscribe((loading: boolean) => {
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
        console.log('key down', this.form?.valid);
        this.inputFillUp.emit(this.form?.valid);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription2.unsubscribe();
    }
    /*  addTodo(newItem: string) {
    this.newItem.emit(newItem);
    this.inputValue = '';
    this.inputFillUp.emit(false);
  }*/
}
