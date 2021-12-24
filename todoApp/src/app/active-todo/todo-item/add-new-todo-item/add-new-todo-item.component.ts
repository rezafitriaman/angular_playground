import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../../models/Todo";
import {TodoService} from "../../../todo.service";
import {ActivatedRoute, UrlTree} from "@angular/router";

@Component({
  selector: 'app-add-new-todo-item',
  templateUrl: './add-new-todo-item.component.html',
  styleUrls: ['./add-new-todo-item.component.css']
})
export class AddNewTodoItemComponent implements OnInit {
  newItem: string;
  changeSaved: boolean;
  @Output() newTodoItem: EventEmitter<Todo>;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {
    this.newItem = '';
    this.newTodoItem = new EventEmitter<Todo>();
    this.changeSaved = false;
  }

  ngOnInit(): void {}

  addTodo(newItem: string) {
    if(newItem === '') return;
    this.newTodoItem.emit({
      id: Date.now().toString(),
      content: this.newItem,
      completed: false,
      editable: false
    });
    this.newItem = '';
    this.changeSaved = true;
  }

  onEnterDown(event: KeyboardEvent, newItem: string) {
    if(newItem === '') return;

    const enterKey = (event.key === 'Enter');

    if(enterKey) {
      this.addTodo(newItem);
    }
  }
}
