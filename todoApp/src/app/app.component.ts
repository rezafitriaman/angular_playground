import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { AccountService } from './account/account.service';
import { HeaderComponent } from './header/header.component';
import { Todos } from './models/Todo';
import { DataStorageService } from './shared/storage/data-storage.service';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Easy-List';
    public error: string | null = null; // TODO 296
    //@ViewChild(HeaderComponent, {static: false}) hello: HeaderComponent | undefined;
    //@ViewChild('myElm', {static: false}) myElm: ElementRef | undefined;
    //@ViewChildren(HeaderComponent) myValue: QueryList<HeaderComponent> | undefined
    constructor(private dataStorageService: DataStorageService, private todoService: TodoService, private accountService: AccountService) {}
    ngOnInit(): void {
        // this.dataStorageService.storeTodos().subscribe((arg) => {
        //     console.log('todo stored', arg);
        // });
        console.log('app component', this.todoService.todos);

        //test
        // this.dataStorageService.fetchTodos().subscribe((todos: Todos) => {
        //     this.todoService.setTodos(todos);
        // });

        this.accountService.thereIsError.subscribe((error) => {
            console.log('on error', error);
            this.error = 'An error has occurred!';
            setTimeout(() => {
                this.error = null;
            }, 6000);
        });
    }
    
    onDismissSnackbar() {
        this.error = null;
    }
}
