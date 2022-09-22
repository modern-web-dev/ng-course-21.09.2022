import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  OperatorFunction,
  switchMap,
  Subject,
  takeUntil,
  merge,
} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
  providers:[
    BookService
  ],
})
export class BookOverviewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typeahead')
  typeahead?: ElementRef<HTMLInputElement>;

  selectedBook: Book | null = null;
  books$: Observable<Book[]> | undefined;
  booksLength$: Observable<number> | undefined;
  private readonly unsubscribe$: Subject<true> = new Subject<true>();

  constructor(private readonly bookService: BookService) {
  }
  typeaheadElems$?: Observable<Book[]>;
  ngAfterViewInit() {
    if (!this.typeahead) {
      throw new Error('Could not find typeahead');
    }

    const typeaheadBooks = fromEvent(
      this.typeahead.nativeElement,
      'input'
    ).pipe(
      mapEventToInputValue(),
      distinctUntilChanged(),
      switchMap((query) => this.bookService.findBooks(query)),
      takeUntil(this.unsubscribe$)
    );

    this.books$ = merge(this.bookService.getAll(), typeaheadBooks);
    setTimeout(()=> {
      this.booksLength$ = this.books$?.pipe(map((books) => books.length));
    },0);
  }

  selectBookOf(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.bookService
      .updateBook(updatedBook)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((updatedBook) => (this.selectedBook = updatedBook));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}

function mapEventToInputValue(): OperatorFunction<Event, string> {
  return map((event: Event) => {
    const input = event.target as HTMLInputElement;
    return input.value;
  });
}
