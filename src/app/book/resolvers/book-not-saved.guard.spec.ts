import { TestBed } from '@angular/core/testing';

import { BookNotSavedGuard } from './book-not-saved.guard';

describe('BookNotSavedGuard', () => {
  let guard: BookNotSavedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BookNotSavedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
