import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  readonly book: Book = {
    author: 'Douglas Crockford',
    title: 'JavaScript.The Good Parts'
  };

  save(event: Event) {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorInput = bookForm.querySelector<HTMLInputElement>('#author');
    const titleInput = bookForm.querySelector<HTMLInputElement>('#title');
    const updatedBook: Book = {
      author: authorInput?.value ?? '',
      title: titleInput?.value ?? ''
    };
    console.log(updatedBook);
  }
}
