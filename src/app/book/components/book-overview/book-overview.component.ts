import { Component, OnDestroy } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import {
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  Subject,
  takeUntil,
  merge,
  debounceTime,
  filter,
} from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy {
  typeaheadControl = new FormControl<string>('', [Validators.maxLength(10)]);

  typeaheadElems$?: Observable<Book[]>;

  private readonly unsubscribe$: Subject<true> = new Subject<true>();

  private typeaheadBooks$ = this.typeaheadControl.valueChanges.pipe(
    filter(() => this.typeaheadControl.valid),
    distinctUntilChanged(),
    debounceTime(500),
    switchMap((query) => this.bookService.findBooks(query)),
    takeUntil(this.unsubscribe$)
  );

  books$: Observable<Book[]> | undefined = merge(
    this.bookService.getAll(),
    this.typeaheadBooks$
  );
  booksLength$: Observable<number> | undefined = this.books$?.pipe(
    map((books) => books.length)
  );

  constructor(private readonly bookService: BookService) {}

  clearInput() {
    this.typeaheadControl.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
