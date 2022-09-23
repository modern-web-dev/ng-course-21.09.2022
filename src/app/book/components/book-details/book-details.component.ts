import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter, delay } from 'rxjs';
import { Book, UpdatedBook } from '../../model/book';
import { BookService } from '../../services/book.service';
import { BookFormService } from './book-form.service';

export type ControlsOf<T> = {
  [K in keyof T]: T[K] extends number | string
    ? FormControl<T[K]>
    : FormGroup<ControlsOf<T[K]>>;
};

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  providers: [BookFormService],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined | null;

  bookFormGroup = this.bookFormService.prepareForm();

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookFormService: BookFormService
  ) {}
  ngOnInit() {
    this.bookFormService.setValidators(this.bookFormGroup);

    this.route.data
      .pipe(
        delay(1000),
        filter((data) => data['fetchBook']),
        switchMap(() => this.route.data),
        map((data) => data['book']!)
      )
      .subscribe((book) => {
        this.book = book;
        this.bookFormGroup.reset(book);
      });
  }
  updateBook(event: Event) {
    event.preventDefault();
    const bookValue = this.bookFormGroup.getRawValue();

    const bookAktion = this.book
      ? this.bookService.updateBook(this.book.id!, bookValue)
      : this.bookService.addBook(bookValue);

    bookAktion.subscribe(() => {
      this.bookFormGroup.markAsPristine();
      this.router.navigate(['..']);
    });
  }

  canExit(): boolean {
    return this.bookFormGroup.pristine;
  }
}
