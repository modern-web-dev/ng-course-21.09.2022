import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookId = +route.paramMap.get('id')!;
    return this.bookService.get(bookId)
    .pipe(
      catchError(() => {
        this.router.navigate(['/books']);
        return throwError(
          () => new Error('Book with ID ${id} could not be found!')
        );
      })
    );
  }
}
