import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTodoComponent } from './active-todo.component';

describe('ActiveTodoComponent', () => {
  let component: ActiveTodoComponent;
  let fixture: ComponentFixture<ActiveTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
