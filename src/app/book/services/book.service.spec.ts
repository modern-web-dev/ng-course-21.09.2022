import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { BASE_URL } from 'src/app/base-url.token';
import { Book } from '../model/book';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

fdescribe('BookService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: BASE_URL, useValue: 'testhost:1234' },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  it('should show errors', (done) => {
    //given
    const bookService = TestBed.inject(BookService);
    const testingService = TestBed.inject(HttpTestingController);
    const books: Book[] = [
      {
        author: {
          firstName: 'TEst',
          lastName: 'TEst',
        },
        title: 'TEst',
        details: {
          pages: 12123222,
        },
        id: 3,
      },
    ];
    bookService.getAll().subscribe({
      error: (serverBooks:HttpErrorResponse) => {
        //then
        expect(serverBooks.status).toBe(HttpStatusCode.NotFound);
        done();
      },
    });

    //when
    testingService
      .expectOne('testhost:1234/api/books')
      .flush(books, {
        status: HttpStatusCode.NotFound,
        statusText: 'Not Found',
      });

    testingService.verify();
  });
});
