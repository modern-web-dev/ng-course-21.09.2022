import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  selectedBook: Book | null = null;

  readonly books$: Observable<Book[]>;
  private readonly bookService: BookService;
  private readonly subscriptions: Subscription[] = [];

  constructor() {
    this.bookService = new BookService();
    this.books$ = this.bookService.getAll();
  }

  selectBookOf(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.subscriptions.push(
      this.bookService.updateBook(updatedBook).subscribe(updatedBook => this.selectedBook = updatedBook)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
