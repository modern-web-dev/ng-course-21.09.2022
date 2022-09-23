import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter } from 'rxjs';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined | null;
  dirty = false;

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
    // event.preventDefault();
    // const bookForm = event.target as HTMLFormElement;
    // const authorInput = bookForm.querySelector<HTMLInputElement>('#author');
    // const titleInput = bookForm.querySelector<HTMLInputElement>('#title');

    // const book: UpdatedBook = {
    //   author: authorInput?.value ?? '',
    //   title: titleInput?.value ?? '',
    // };
    // const bookAktion = this.book
    //   ? this.bookService.updateBook(this.book.id!, book)
    //   : this.bookService.addBook(book);
    // bookAktion.subscribe(() => {
    //   this.dirty = false;
    //   this.router.navigate(['..']);
    // });
  }
  markAsDirty() {
    this.dirty = true;
  }
  canExit(): boolean {
    return !this.dirty;
  }
}
