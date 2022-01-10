import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from "../../../todo.service";
import {ActivatedRoute, UrlTree} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-add-new-todo-item',
  templateUrl: './add-new-todo-item.component.html',
  styleUrls: ['./add-new-todo-item.component.css']
})
export class AddNewTodoItemComponent implements OnInit {
  @Output() newItem: EventEmitter<string>;
  @Output() inputFillUp: EventEmitter<boolean>;
  @Input() inputValue: string;
  subscription: Subscription;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {
    this.inputValue = '';
    this.newItem = new EventEmitter<string>();
    this.inputFillUp = new EventEmitter<boolean>();
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.resetPlaceHolder.subscribe((value: string)=> {
      this.inputValue = value;
    })
  }

  addTodo(newItem: string) {
    this.newItem.emit(newItem);
    this.inputValue = '';
    this.inputFillUp.emit(false);
  }

  onKeyDown(event: KeyboardEvent) {
    const enterKey = (event.key === 'Enter');
    this.inputFillUp.emit(true);

    if(enterKey) {
      this.addTodo(this.inputValue);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
