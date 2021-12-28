import { TestBed } from '@angular/core/testing';

import { TodoItemResolverService } from './todo-item-resolver.service';

describe('TodoItemResolverService', () => {
  let service: TodoItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
