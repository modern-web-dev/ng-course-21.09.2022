import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  selectedBook: Book | null = null;

  books: Book[] = [
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript.The Good Parts'
    },
    {
      id: 1,
      author: 'Gang of Four',
      title: 'Design Patterns'
    },
    {
      id: 2,
      author: 'Robert C. Martin',
      title: 'Clean Code'
    }
  ];

  selectBookOf(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    const updatedBookCopy = {...updatedBook};
    this.books = this.books.map(
      book => book.id === updatedBook.id ? updatedBookCopy : book);
    this.selectedBook = updatedBookCopy;
  }
}
