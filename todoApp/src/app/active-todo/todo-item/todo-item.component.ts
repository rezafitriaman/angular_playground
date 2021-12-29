import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Data, Params, UrlTree} from "@angular/router";
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {CanComponentDeactivate} from "../can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
  inputFillUp: boolean;
  id: number;
  todos: Todo[];
  newItem: string;
  placeHolder: string;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private renderer: Renderer2) {
    this.id = 0;
    this.todos = [];
    this.inputFillUp = false;
    this.newItem = '';
    this.placeHolder = '';
    this.loading = false;
  }

  ngOnInit(): void {
    console.log(this.loading);
    // it load via a normal route
    /*this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.todos = this.todoService.getActiveTodoItem(this.id);
    })*/

    // it load via a resolver : example - 152
    this.route.data.subscribe((data: Data)=> {
      this.todos = data['activeTodoItem'];
    });
    this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }

  ngAfterViewInit() {
    //console.log(this.editableText)
    //console.log()
    //this.renderer.selectRootElement('.todo-items')
    //this.setCaret();
  }

  onInputFillUp(inputFillUp: boolean) {
    this.inputFillUp = inputFillUp;
  }

  onAddNewTodoItem(newItem: string) {
    if(newItem === '') return;
    this.newItem = newItem;

    this.todoService.addTodoItem({
      id: Date.now().toString(),
      content: newItem,
      completed: false,
      editable: false
    }, this.id)

    this.inputFillUp = false;
  }

/*  onChangeSaved(change: boolean) {
    this.changeSaved = change;
  }*/

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

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.inputFillUp) {
      if (!confirm('Do you want to discard the changes?')) return false;

      this.todoService.resetPlaceHolder.emit('');
      this.inputFillUp = false;
      return true;
    }else {
      return true;
    }
  }
}
