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
        console.log(this.todoService.getTodos().inActiveTodos[0].todo.content);
        // this.dataStorageService.storeTodos().subscribe((arg) => {
        //     console.log('todo stored', arg);
        // });
    }
    ngAfterViewInit() {
        //console.log("Hello ", this.myValue?.toArray());
    }
}
