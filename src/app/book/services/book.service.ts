import { Book } from '../model/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
  private readonly booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript.The Good Parts',
    },
    {
      id: 1,
      author: 'Gang of Four',
      title: 'Design Patterns',
    },
    {
      id: 2,
      author: 'Robert C. Martin',
      title: 'Clean Code',
    },
  ]);
  private readonly books$ = this.booksSubject.asObservable();

  getAll(): Observable<Book[]> {
    console.log('getAll')
    return this.books$;
  }

  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      const updatedBookCopy = { ...bookToUpdate };
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
      
    console.log('findBooks')
      const books = this.booksSubject.getValue();
      const filteredBooks = books.filter(
        (book) => book.title.indexOf(query) != -1
      );
      subscriber.next(filteredBooks);
      subscriber.complete();
    });
  }
}
