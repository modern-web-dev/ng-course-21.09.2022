import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class BookService {
  readonly contextPath = '/api/books';

  constructor(private readonly httpClient: HttpClient) {}
  get(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.contextPath}/${id}`);
  }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.contextPath);
  }

  addBook(bookToAdd: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.contextPath, bookToAdd);
  }
  updateBook(id: number, bookToUpdate: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.contextPath}/${id}`, bookToUpdate);
  }

  findBooks(q: string): Observable<Book[]> {
    const params = new HttpParams({ fromObject: { q } });
    return this.httpClient.get<Book[]>(`${this.contextPath}`, { params });
  }
}
