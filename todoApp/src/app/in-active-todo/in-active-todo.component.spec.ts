import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InActiveTodoComponent } from './in-active-todo.component';

describe('InActiveTodoComponent', () => {
  let component: InActiveTodoComponent;
  let fixture: ComponentFixture<InActiveTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InActiveTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InActiveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
