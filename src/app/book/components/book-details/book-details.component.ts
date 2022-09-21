import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input('value')
  book: Book | undefined | null;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorInput = bookForm.querySelector<HTMLInputElement>('#author');
    const titleInput = bookForm.querySelector<HTMLInputElement>('#title');
    if (this.book) {
      const updatedBook: Book = {
        id: this.book.id,
        author: authorInput?.value ?? '',
        title: titleInput?.value ?? ''
      };
      this.bookChange.emit(updatedBook);
    }
  }
}
