import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveTodoComponent } from './inactive-todo.component';

describe('InActiveTodoComponent', () => {
  let component: InactiveTodoComponent;
  let fixture: ComponentFixture<InactiveTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
