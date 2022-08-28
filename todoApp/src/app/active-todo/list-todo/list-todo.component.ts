import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { fromEvent, Observable, Subscription, timer } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { Direction } from 'src/app/models/Types';
import { ActiveTodoService } from '../active-todo.service';

// This is the header - list of todo header
@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('listTodoContainer') listTodoContainer!: ElementRef;
    @ViewChild('sliderContainer') sliderContainer!: ElementRef;
    @ViewChild('overflowParentContainer') overflowParentContainer!: ElementRef;
    @ViewChild('btnLeft') btnLeft!: ElementRef;
    @ViewChild('btnRight') btnRight!: ElementRef;
    public todos: Array<ActiveTodo> = [];
    public isNewTodo: boolean = false;
    private timerSubscription: Subscription | undefined;
    private subscription!: Subscription;
    private subscriptionDelete!: Subscription;
    private subscriptionResetSlider!: Subscription;
    private resizeObservable$: Observable<Event> | undefined;
    private resizeSubscription$: Subscription | undefined;
    private containerWidth: number = 0;
    private sliderWidth: number = 0;
    private translateNumber: number = 0;
    private isHorizontalScrolled: number = 0;
    private translateGap: number = 200;

    constructor (
        private todoService: TodoService, 
        private renderer: Renderer2, 
        private activeTodoService: ActiveTodoService
    ) {}

    private calculateSlider() {
        this.containerWidth = this.activeTodoService.getElmWidth(this.listTodoContainer);
        this.sliderWidth = this.activeTodoService.getElmWidth(this.sliderContainer);
    }

    private setStyleTranslate(translateNumber: number) {
        this.renderer.setStyle(this.sliderContainer.nativeElement, 'transform', `transLateX(${translateNumber}px)`);
    }

    private showRightButton() {
        if(this.sliderWidth > this.containerWidth) this.activeTodoService.showBtn(this.btnRight);
    }
    
    ngOnInit(): void {
        this.todos = this.todoService.getActiveTodos();

        this.subscription = this.todoService.activeTodosAdd.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
            this.isNewTodo = true;
            this.timerSubscription = timer(4000).subscribe( _ => this.isNewTodo = false);
        });

        this.subscriptionDelete = this.todoService.activeTodoDelete.subscribe((activeTodos: Array<ActiveTodo>) => {
            this.todos = activeTodos;
        });

        this.subscriptionResetSlider = this.activeTodoService.resetSlider.pipe(delay(50)).subscribe(deleteItem => {
            this.calculateSlider();
            //hide left button on resize and reset
            this.activeTodoService.hideBtn(this.btnLeft);
            // show right button if slider width wider then container widht
            this.showRightButton();
            // if ondeleteItem click stop the code
            if(deleteItem) return;
            let isMobile = this.containerWidth < this.activeTodoService.getBreakpoints('sm');
            //reset to 0
            this.translateNumber = 0;
            this.setStyleTranslate(this.translateNumber);
            // on miblie reset to left
            if(isMobile) (this.overflowParentContainer.nativeElement as HTMLInputElement).scrollLeft = 0;
        })
    }

    ngAfterViewInit(): void {
        this.calculateSlider();
        this.resizeObservable$ = fromEvent(window, 'resize');
        // show right button if slider width wider then container widht
        this.showRightButton();

        this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(500)).subscribe(evt => {
            this.calculateSlider();
            let isMobile = (evt.target as Window).innerWidth < this.activeTodoService.getBreakpoints('sm');
            this.activeTodoService.resetSlider.next(false);

            //show btn if sliderWidth is bigger then his container 
            this.showRightButton();
            //hidden btn if sliderWidth is smaller then his container 
            if(this.sliderWidth < this.containerWidth) this.activeTodoService.hideBtn(this.btnRight);
            //if has scrolled then reset 
            if(this.isHorizontalScrolled > 0) (this.overflowParentContainer.nativeElement as HTMLInputElement).scrollLeft = 0;
            //hide btn on isMobile            
            if(isMobile) this.activeTodoService.hideBtn(this.btnRight);
        })
    }

    onScroll(event: Event) {
        this.isHorizontalScrolled = (event.target as HTMLInputElement)?.scrollLeft;
    }

    onClick(direction: Direction.Left | Direction.Right) {
        switch (direction) {
            case Direction.Left:
                this.translateNumber += this.translateGap;
                this.setStyleTranslate(this.translateNumber);
                this.activeTodoService.showBtn(this.btnRight);
                let isOnStartPosition = this.translateNumber >= 0;

                if(isOnStartPosition) {
                    this.translateNumber = 0;
                    this.setStyleTranslate(this.translateNumber);
                    this.activeTodoService.hideBtn(this.btnLeft);
                }
                break;
            case Direction.Right:
                this.translateNumber -= this.translateGap;
                this.setStyleTranslate(this.translateNumber);
                this.activeTodoService.showBtn(this.btnLeft);
                let isOnRightBorder = (this.containerWidth - this.translateNumber) > this.sliderWidth;

                if(isOnRightBorder) {
                    this.translateNumber = -(this.sliderWidth - this.containerWidth);
                    this.setStyleTranslate(this.translateNumber);
                    this.activeTodoService.hideBtn(this.btnRight);
                }
                break;
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.subscriptionDelete?.unsubscribe(); 
        this.resizeSubscription$?.unsubscribe();
        this.timerSubscription?.unsubscribe();
        this.subscriptionResetSlider?.unsubscribe();
    }
}