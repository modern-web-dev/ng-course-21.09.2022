import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BookService } from '../../services/book.service';

import { BookDetailsComponent } from './book-details.component';

fdescribe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  const bookServiceMock = {} as BookService;

  const routeDate = new BehaviorSubject({});
  const activatedRouteMock = {
    data: routeDate.asObservable(),
  } as ActivatedRoute;



  describe('[TS Tests]', () => {


  });
  
  describe('[HTML Tests]', () => {


  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
