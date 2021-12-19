import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, AfterViewInit {
  //@ViewChildren('editable') editableText: ElementRef;
  id: number;
  todos: Todo[];
  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private renderer: Renderer2) {
    this.id = 0;
    this.todos = [];
    //this.editableText = {nativeElement: ElementRef}
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.todos = this.todoService.getActiveTodoItem(this.id);
    })
  }

  ngAfterViewInit() {
    //console.log(this.editableText)
    //console.log()
    //this.renderer.selectRootElement('.todo-items')
    //this.setCaret();
  }

  addNewTodoItem(todoItem: Todo) {
    this.todoService.addTodoItem(todoItem, this.id)
  }

  onSetToComplete(indexItem: number) {
    if(this.todos[indexItem].editable) return;
    this.todoService.onSetToComplete(indexItem, this.id);
  }

  onSetToEditable(indexItem: number) {
    //TODO place the cursor on the text pls http://jsfiddle.net/timdown/vXnCM/
    this.todoService.onSetToEditable(indexItem, this.id);

    setTimeout(()=> {
      //this.setCaret();
    },2000)
  }

  setCaret() {
    /*const el = this.editableText.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection()!;
    console.log(el)
    range.setStart(el, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);*/
    //el.focus();
  }

  onSetToInactive(index: number) {
    //this.todoService.onSetToInactive(index);
  }
}
