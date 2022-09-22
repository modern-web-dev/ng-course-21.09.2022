import { Book } from '../model/book';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  idSeq = 0;
  private readonly booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript.The Good Parts',
    },
    {
      id: this.idSeq++,
      author: 'Gang of Four',
      title: 'Design Patterns',
    },
    {
      id: this.idSeq++,
      author: 'Robert C. Martin',
      title: 'Clean Code',
    },
  ]);
  private readonly books$ = this.booksSubject.asObservable();

  get(id: number): Observable<Book> {
    const currentBooks = this.booksSubject.getValue();
    const book = currentBooks.filter((book) => book.id === id)[0];
    if(book){
      return of(book);
    }
    return throwError(() => new Error('Book with ID ${id} could not be found!'))
  }

  getAll(): Observable<Book[]> {
    return this.books$;
  }

  addBook(bookToAdd: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      const createdBookCopy = { ...bookToAdd, id: this.idSeq++  };
      const currentBooks = this.booksSubject.getValue();
      currentBooks.push(createdBookCopy);

      this.booksSubject.next(currentBooks);
      subscriber.next(createdBookCopy);
      subscriber.complete();
    });
  }
  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      const updatedBookCopy = { ...bookToUpdate};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = currentBooks.map((book) =>
        book.id === bookToUpdate.id ? updatedBookCopy : book
      );
      this.booksSubject.next(newBooks);
      subscriber.next(updatedBookCopy);
      subscriber.complete();
    });
  }

  findBooks(query: string): Observable<Book[]> {
    return new Observable<Book[]>((subscriber) => {
      console.log('findBooks');
      const books = this.booksSubject.getValue();
      const filteredBooks = books.filter(
        (book) => book.title.indexOf(query) != -1
      );
      subscriber.next(filteredBooks);
      subscriber.complete();
    });
  }
}
