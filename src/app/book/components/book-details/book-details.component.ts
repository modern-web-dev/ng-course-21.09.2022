import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap, filter } from 'rxjs';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined | null;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.route.data
      .pipe(
        filter((data) => data['fetchBook']),
        switchMap(() => this.route.data),
        map((data) => data['book']!)
      )
      .subscribe((book) => {
        this.book = book;
        this.dirty = false;
      });

    this.route.data.pipe(filter((data) => !data['fetchBook'])).subscribe();
  }
  updateBook(event: Event) {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorInput = bookForm.querySelector<HTMLInputElement>('#author');
    const titleInput = bookForm.querySelector<HTMLInputElement>('#title');
    if (this.book) {
      const updatedBook: Book = {
        id: this.book.id,
        author: authorInput?.value ?? '',
        title: titleInput?.value ?? '',
      };
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.dirty = false;
        this.router.navigate(['..']);
      });
    } else {
      const newBook: Book = {
        author: authorInput?.value ?? '',
        title: titleInput?.value ?? '',
      };
      this.bookService.addBook(newBook).subscribe(() => {
        this.dirty = false;
        this.router.navigate(['..']);
      });
    }
  }
  dirty = false;
  markAsDirty() {
    this.dirty = true;
  }
  canExit(): boolean {
    return !this.dirty;
  }
}
