import { TestBed } from '@angular/core/testing';

import { ActiveTodoService } from './active-todo.service';

describe('ActiveTodoService', () => {
  let service: ActiveTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
