import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTodoItemComponent } from './add-new-todo-item.component';

describe('AddNewTodoItemComponent', () => {
  let component: AddNewTodoItemComponent;
  let fixture: ComponentFixture<AddNewTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTodoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
