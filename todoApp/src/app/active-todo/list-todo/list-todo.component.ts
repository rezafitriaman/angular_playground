import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { of, Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Direction } from 'src/app/models/Types';

// This is the header - list of todo header
@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit, OnDestroy {
    @ViewChild('sliderContainer') sliderContainer!: ElementRef;
    @ViewChild('parentContainer') parentContainer!: ElementRef;
    @ViewChild('btnLeft') btnLeft!: ElementRef;
    @ViewChild('btnRight') btnRight!: ElementRef;
    public todos: Array<ActiveTodo> = [];
    public isNewTodo: boolean = false;
    public subscription!: Subscription;
    public subscriptionDelete!: Subscription;
    public translateNumber: number = 0;
    public translateGap: number = 200; 
    constructor(private todoService: TodoService, private renderer: Renderer2) {}
    
    ngOnInit(): void {
        this.todos = this.todoService.getActiveTodos();
        this.subscription = this.todoService.activeTodosAdd.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
            this.isNewTodo = true;

            of(null).pipe(
                take(1),
                delay(4000)
            ).subscribe(value => {
                if(!value){
                    this.isNewTodo = false;
                }
            })
        });

        this.subscriptionDelete = this.todoService.activeTodoDelete.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
        });
    }

    onClick(direction: Direction.Left | Direction.Right) {
        let containerWidth = parseInt(getComputedStyle(this.sliderContainer.nativeElement).width); 
        let sliderWidth =  parseInt(getComputedStyle(this.parentContainer.nativeElement).width);

        switch (direction) {
            case Direction.Left:
                this.translateNumber += this.translateGap;
                this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                let isOnStartPosition = this.translateNumber >= 0;

                if(isOnStartPosition) {
                    this.translateNumber = 0;
                    this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${0}px)`);
                    this.renderer.addClass(this.btnLeft.nativeElement, 'hidden');                    
                }

                this.renderer.removeClass(this.btnRight.nativeElement, 'hidden');
                break;
            case Direction.Right:
                this.translateNumber -= this.translateGap;
                this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                let isOnRightBorder = -containerWidth + this.translateNumber < -sliderWidth;
                
                if(isOnRightBorder) {
                    this.translateNumber = -(sliderWidth - containerWidth);
                    this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                    this.renderer.addClass(this.btnRight.nativeElement, 'hidden');
                }
                
                this.renderer.removeClass(this.btnLeft.nativeElement, 'hidden');
                break;
            default:
                break;
        }
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.subscriptionDelete?.unsubscribe();
    }
}
