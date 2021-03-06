import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/storage/data-storage.service';

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit, CanComponentDeactivate, OnDestroy {
    @ViewChild('addTodoForm') form: NgForm | undefined;
    public newActiveTodo: ActiveTodo = new ActiveTodo('', []);
    public changesSaved: boolean = false;
    public loading: boolean = false;
    public subscription: Subscription = new Observable().subscribe();

    constructor(
        private todoService: TodoService,
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService
    ) {}

    ngOnInit(): void {
        this.subscription = this.todoService.loading.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }

    onSubmit() {
        // ? push the item to firebase
        const newTodo = this.form?.value.newTodo;
        if (newTodo === '') return;

        this.newActiveTodo = new ActiveTodo(newTodo, []);
        this.todoService.addTodo(this.newActiveTodo);
        console.log('on add new label todo,');
        // ? push a new Todo object but be aware it push without the items property on the firebase
        this.dataStorageService.postTodos(this.newActiveTodo).subscribe((added) => {
            console.log('add todo', added);
        });
        this.form?.reset();
        const lastAddedTodoItem = this.todoService.getActiveTodos().length - 1;
        this.changesSaved = true;

        this.router.navigate(['../', lastAddedTodoItem], {
            relativeTo: this.route,
        });
        this.todoService.loading.next(true);
    }

    canDeactivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.form?.value.newTodo !== '' && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        } else {
            return true;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addTodo(newTodo: string) {
        /*    if (newTodo === '') return;
    
    this.newActiveTodo = {
      label: newTodo,
      items: [],
    }
    this.todoService.addTodo(this.newActiveTodo);
    this.newTodo = '';
    const lastAdded = this.todoService.getActiveTodos().length - 1;
    this.changesSaved = true;
    
    this.router.navigate(['../', lastAdded], {relativeTo: this.route})
    this.todoService.loading.next(true);*/
    }

    onEnterDown(event: KeyboardEvent, newItem: string) {
        /*    if(newItem === '') return;
    
    const enterKey = (event.key === 'Enter');
    
    if(enterKey) this.addTodo(newItem);*/
    }
}
