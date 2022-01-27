import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TodoService} from "../../../todo.service";
import {ActivatedRoute, UrlTree} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-new-todo-item',
  templateUrl: './add-new-todo-item.component.html',
  styleUrls: ['./add-new-todo-item.component.css']
})
export class AddNewTodoItemComponent implements OnInit {
  @Output() newItem: EventEmitter<string>;
  @Output() inputFillUp: EventEmitter<boolean | null | undefined>;
  @ViewChild('addItemForm') form: NgForm | undefined;
  inputValue: string;
  subscription: Subscription;
  subscription2: Subscription;
  loading: boolean;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {
    this.inputValue = '';
    this.loading = false;
    this.newItem = new EventEmitter<string>();
    this.inputFillUp = new EventEmitter<boolean | null | undefined>();
    this.subscription = new Observable().subscribe();
    this.subscription2 = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.resetPlaceHolder.subscribe((value: string)=> {
      this.inputValue = value;
    })
    this.subscription2 = this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }

  onSubmit() {
    const newItem = this.form?.value.newItem;
    if(newItem === '') return
    this.newItem.emit(newItem);
    this.form?.reset();
    this.inputFillUp.emit(false);
  }

/*  addTodo(newItem: string) {
    this.newItem.emit(newItem);
    this.inputValue = '';
    this.inputFillUp.emit(false);
  }*/

  onKeyDown(event: KeyboardEvent) {
    this.inputFillUp.emit(this.form?.valid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
