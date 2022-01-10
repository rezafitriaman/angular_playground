import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit, QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ActivatedRoute, Data, Params, UrlTree} from "@angular/router";
import {Todo} from "../../models/Todo";
import {TodoService} from "../../todo.service";
import {CanComponentDeactivate} from "../can-deactivate-guard.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, AfterViewInit, CanComponentDeactivate, OnDestroy {
  inputFillUp: boolean;
  id: number;
  todos: Todo[];
  newItem: string;
  placeHolder: string;
  loading: boolean;
  subscription: Subscription;
  @ViewChildren('contentTodo') contentTodoRef: QueryList<ElementRef> | undefined;

  constructor(private route: ActivatedRoute,
              private todoService: TodoService,
              private renderer: Renderer2) {
    this.id = 0;
    this.todos = [];
    this.inputFillUp = false;
    this.newItem = '';
    this.placeHolder = '';
    this.loading = false;
    this.subscription = new Observable().subscribe();
  }

  ngOnInit(): void {
    // it load via a resolver : example - 152
    this.route.data.subscribe((data: Data)=> {
      this.todos = data['activeTodoItem'];
    });

    // it load via a normal route
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.todos = this.todoService.getActiveTodoItem(this.id);
    })

    this.subscription = this.todoService.loading.subscribe((loading: boolean)=> {
      this.loading = loading;
    })
  }

  ngAfterViewInit() {
    console.log(this.contentTodoRef);
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

  onSetToComplete(indexItem: number) {
    console.log('onSetToComplete', indexItem);
    if(this.todos[indexItem].editable) return;
    this.todoService.onSetToComplete(indexItem, this.id);
  }

  onSetToInactive(indexItem: number) {
    this.todoService.onSetToInactive(indexItem, this.id);
  }

  onSetToEditable(indexItem: number) {
    this.todoService.onSetToEditable(indexItem, this.id);
    //TODO change todo content
    console.log(this.contentTodoRef?.toArray()[indexItem].nativeElement.innerText.replace(/[^0-9]/g,''));

    //TODO place the cursor on the text pls http://jsfiddle.net/timdown/vXnCM/
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

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.inputFillUp) {
      if (!confirm('Do you want to discard the changes?')) return false;

      this.todoService.resetPlaceHolder.next('');
      this.inputFillUp = false;
      return true;
    }else {
      return true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
