import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActiveTodo } from '../../models/Todo';
import { TodoService } from '../../todo.service';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, delay, map, take } from 'rxjs/operators';
import { Direction } from 'src/app/models/Types';

// This is the header - list of todo header
@Component({
    selector: 'app-list-todo',
    templateUrl: './list-todo.component.html',
    styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('sliderContainer') sliderContainer!: ElementRef;
    @ViewChild('parentContainer') parentContainer!: ElementRef;
    @ViewChild('overflowParentContainer') overflowParentContainer!: ElementRef;
    @ViewChild('btnLeft') btnLeft!: ElementRef;
    @ViewChild('btnRight') btnRight!: ElementRef;
    public todos: Array<ActiveTodo> = [];
    public isNewTodo: boolean = false;
    private subscription!: Subscription;
    private subscriptionDelete!: Subscription;
    private translateNumber: number = 0;
    private translateGap: number = 200;
    private containerWidth: number = 0;
    private sliderWidth: number = 0;
    private isHorizontalScrolled: number = 0
    private md: number = 768;
    private sm: number = 640;
    private resizeObservable$: Observable<Event> | undefined;
    private resizeSubscription$: Subscription | undefined;

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

        if(this.sliderWidth < this.containerWidth) this.renderer.removeClass(this.btnRight.nativeElement, 'hidden');
    }

    ngAfterViewInit(): void {
        this.containerWidth = parseInt(getComputedStyle(this.sliderContainer.nativeElement).width); 
        this.sliderWidth = parseInt(getComputedStyle(this.parentContainer.nativeElement).width);
        this.resizeObservable$ = fromEvent(window, 'resize');

        if(this.sliderWidth > this.containerWidth) this.renderer.removeClass(this.btnRight.nativeElement, 'hidden');

        this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(500)).subscribe( evt => {
            const target = evt.target as Window; 
            let mobile = target.innerWidth < this.sm;
            this.translateNumber = 0;
            this.containerWidth = parseInt(getComputedStyle(this.sliderContainer.nativeElement).width); 
            this.sliderWidth = parseInt(getComputedStyle(this.parentContainer.nativeElement).width);
            
            this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
            //hide left button on resize
            this.renderer.addClass(this.btnLeft.nativeElement, 'hidden');
            
            if(mobile) {
                //hide btn on mobile
                this.renderer.addClass(this.btnRight.nativeElement, 'hidden');
            }else {
                //show btn if sliderWidth is bigger then his container 
                if(this.sliderWidth > this.containerWidth) this.renderer.removeClass(this.btnRight.nativeElement, 'hidden');
                //hidden btn if sliderWidth is smaller then his container 
                if(this.sliderWidth < this.containerWidth) this.renderer.addClass(this.btnRight.nativeElement, 'hidden');
                //if has scrolled then reset 
                if(this.isHorizontalScrolled > 0) (this.overflowParentContainer.nativeElement as HTMLInputElement).scrollLeft = 0;
            }
        })
    }

    onScroll(event: Event) {
        this.isHorizontalScrolled = (event.target as HTMLInputElement)?.scrollLeft;
    }

    onClick(direction: Direction.Left | Direction.Right) {
        switch (direction) {
            case Direction.Left:
                this.translateNumber += this.translateGap;
                this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                let isOnStartPosition = this.translateNumber >= 0;

                if(isOnStartPosition) {
                    this.translateNumber = 0;
                    this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                    this.renderer.addClass(this.btnLeft.nativeElement, 'hidden');
                }

                this.renderer.removeClass(this.btnRight.nativeElement, 'hidden');
                break;
            case Direction.Right:
                this.translateNumber -= this.translateGap;
                this.renderer.setStyle(this.parentContainer.nativeElement, 'transform', `transLateX(${this.translateNumber}px)`);
                let isOnRightBorder = this.containerWidth - this.translateNumber > this.sliderWidth;

                if(isOnRightBorder) {
                    this.translateNumber = -(this.sliderWidth - this.containerWidth);
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
        this.resizeSubscription$?.unsubscribe();
    }
}
