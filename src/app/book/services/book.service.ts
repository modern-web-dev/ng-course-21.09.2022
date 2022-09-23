import { Book, UpdatedBook } from '../model/book';
import { Observable } from 'rxjs';
import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BASE_URL } from 'src/app/base-url.token';

@Injectable()
export class BookService {
  readonly contextPath = '/api/books';
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(BASE_URL) private readonly baseApi: string
  ) {}

  get(id: number): Observable<Book> {
    return this.httpClient.get<Book>(
      `${this.baseApi}${this.contextPath}/${id}`
    );
  }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseApi}${this.contextPath}`);
  }

  addBook(bookToAdd: UpdatedBook): Observable<Book> {
    return this.httpClient.post<Book>(
      `${this.baseApi}${this.contextPath}`,
      bookToAdd
    );
  }
  updateBook(id: number, bookToUpdate: UpdatedBook): Observable<Book> {
    return this.httpClient.put<Book>(
      `${this.baseApi}${this.contextPath}/${id}`,
      bookToUpdate
    );
  }

  findBooks(query: string | null): Observable<Book[]> {
    let params = new HttpParams();
    if(query){
      params = params.append('q', query)
    }
    return this.httpClient.get<Book[]>(`${this.baseApi}${this.contextPath}`, {
      params,
    });
  }
}
