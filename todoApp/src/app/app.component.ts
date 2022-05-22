import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Todos } from './models/Todo';
import { DataStorageService } from './shared/storage/data-storage.service';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
    title = 'Easy-List';
    //@ViewChild(HeaderComponent, {static: false}) hello: HeaderComponent | undefined;
    //@ViewChild('myElm', {static: false}) myElm: ElementRef | undefined;
    //@ViewChildren(HeaderComponent) myValue: QueryList<HeaderComponent> | undefined
    constructor(private dataStorageService: DataStorageService, private todoService: TodoService) {}
    ngOnInit(): void {
        // this.dataStorageService.storeTodos().subscribe((arg) => {
        //     console.log('todo stored', arg);
        // });
        console.log('app component', this.todoService.todos);
        this.dataStorageService.fetchTodos().subscribe((todos: Todos) => {
            this.todoService.setTodos(todos);
        });
    }
    
    ngAfterViewInit() {
        //console.log("Hello ", this.myValue?.toArray());
    }
}
