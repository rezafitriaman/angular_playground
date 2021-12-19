import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Todo} from "../../../models/Todo";
import {TodoService} from "../../../todo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-new-todo-item',
  templateUrl: './add-new-todo-item.component.html',
  styleUrls: ['./add-new-todo-item.component.css']
})
export class AddNewTodoItemComponent implements OnInit {
  newItem: string;
  @Output() newTodoItem: EventEmitter<Todo>;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {
    this.newItem = '';
    this.newTodoItem = new EventEmitter<Todo>();
  }

  ngOnInit(): void {

  }

  addTodo(newItem: string) {
    if(newItem === '') return;
    console.log(this.newItem);
    this.newTodoItem.emit({
      id: Date.now().toString(),
      content: this.newItem,
      completed: false,
      editable: false
    })
    /*this.newTodo = {
      id: Date.now().toString(),
      content: this.newItem,
      completed: false
    };*/
    //this.todoService.addTodo(this.newTodo);
    this.newItem = '';
  }

  onEnterDown(event: KeyboardEvent, newItem: string) {
    if(newItem === '') return;

    const enterKey = (event.key === 'Enter');

    if(enterKey) {
      this.addTodo(newItem);
    }
  }
}
