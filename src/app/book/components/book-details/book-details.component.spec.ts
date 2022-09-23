import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardComponent } from 'src/app/shared/card/card.component';
import { ValidationMessageComponent } from 'src/app/shared/validation-message/validation-message.component';
import { Book, UpdatedBook } from '../../model/book';
import { BookService } from '../../services/book.service';

import { BookDetailsComponent, ControlsOf } from './book-details.component';
import { BookFormService } from './book-form.service';

describe('BookDetailsComponent', () => {
  describe('[Class Tests]', () => {
    it('should subscribe to router data', fakeAsync(() => {
      //given
      const book = {
        author: {
          firstName: 'Douglas',
          lastName: 'Crockford',
        },
        title: 'JavaScript. The Good Parts',
        details: {
          pages: 180,
        },
      };
      const bookService: BookService = {} as BookService;

      const dataObservable = new BehaviorSubject<any>({
        fetchBook: true,
        book,
      });
      const route: ActivatedRoute = {
        data: dataObservable.asObservable(),
      } as ActivatedRoute;

      const router: Router = {} as Router;
      const bookFormService: BookFormService = {
        setValidators: jasmine.createSpy('setValidators') as any,
        prepareForm: () =>
          new FormGroup<ControlsOf<UpdatedBook>>({
            author: new FormGroup({
              firstName: new FormControl('', { nonNullable: true }),
              lastName: new FormControl('', { nonNullable: true }),
            }),
            title: new FormControl('', { nonNullable: true }),
            details: new FormGroup({
              pages: new FormControl(0, { nonNullable: true }),
            }),
          }),
      } as BookFormService;

      const component = new BookDetailsComponent(
        bookService,
        route,
        router,
        bookFormService
      );

      //when
      component.ngOnInit();

      tick(10000);
      //then

      expect(component.bookFormGroup).toBeDefined();
      expect(bookFormService.setValidators).toHaveBeenCalled();
      expect(component.book).toBeDefined();
      expect(component.bookFormGroup.getRawValue()).toEqual(book);
    }));

    it('should save book', () => {
      //given
      const subscribeSpy = jasmine.createSpy('subscribeSpy');
      const bookService: BookService = {
        addBook: (bookToAdd: UpdatedBook) =>
          ({ subscribe: subscribeSpy } as unknown as Observable<Book>),
      } as BookService;
      const event: Event = {
        preventDefault: jasmine.createSpy('preventDefault') as any,
      } as Event;

      const dataObservable = new BehaviorSubject<any>({ fetchBook: false });
      const route: ActivatedRoute = {
        data: dataObservable.asObservable(),
      } as ActivatedRoute;

      const router: Router = {} as Router;
      const bookFormService: BookFormService = {
        setValidators: jasmine.createSpy('setValidators') as any,
        prepareForm: () =>
          new FormGroup<ControlsOf<UpdatedBook>>({
            author: new FormGroup({
              firstName: new FormControl('', { nonNullable: true }),
              lastName: new FormControl('', { nonNullable: true }),
            }),
            title: new FormControl('', { nonNullable: true }),
            details: new FormGroup({
              pages: new FormControl(0, { nonNullable: true }),
            }),
          }),
      } as BookFormService;

      const component = new BookDetailsComponent(
        bookService,
        route,
        router,
        bookFormService
      );

      component.ngOnInit();
      //when

      component.updateBook(event);
      //then

      expect(subscribeSpy).toHaveBeenCalled();
    });

    // if('', ()=>{

    // })
  });

  describe('[HTML Tests]', () => {
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    const subscribeSpy = jasmine.createSpy('subscribeSpy');
    const bookServiceMock = {
      updateBook: (id: number, bookToUpdate: UpdatedBook) =>
        ({ subscribe: subscribeSpy } as unknown as Observable<Book>),
    } as BookService;

    const routeDate = new BehaviorSubject({});
    const activatedRouteMock = {
      data: routeDate.asObservable(),
    } as ActivatedRoute;

    const routerMock = {
      navigate: jasmine.createSpy('navigate') as any,
    } as Router;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          BookDetailsComponent,
          CardComponent,
          ValidationMessageComponent,
        ],
        providers: [
          { provide: BookService, useValue: bookServiceMock },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: Router, useValue: routerMock },
        ],
        imports: [ReactiveFormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should compile', () => {
      expect(component).toBeTruthy();
    });
    it('should show empty form', () => {
      const componentNativeElement = fixture.nativeElement as HTMLElement;
      const firstNameControl =
        componentNativeElement.querySelector<HTMLInputElement>('#firstName');
      const lastNameControl =
        componentNativeElement.querySelector<HTMLInputElement>('#lastName');

      expect(firstNameControl?.value).toBe('');
      expect(lastNameControl?.value).toBe('');
    });
    it('should fill the form', fakeAsync(() => {
      //given
      const book = {
        author: {
          firstName: 'Douglas',
          lastName: 'Crockford',
        },
        title: 'JavaScript. The Good Parts',
        details: {
          pages: 180,
        },
        id: 1,
      };
      //when
      routeDate.next({
        fetchBook: true,
        book,
      });
      tick(2000);
      fixture.detectChanges();
      //then

      expect(component.book).toBe(book);

      const componentNativeElement = fixture.nativeElement as HTMLElement;
      const firstNameControl =
        componentNativeElement.querySelector<HTMLInputElement>('#firstName');
      const lastNameControl =
        componentNativeElement.querySelector<HTMLInputElement>('#lastName');

      expect(firstNameControl?.value).toBe(book.author.firstName);
      expect(lastNameControl?.value).toBe(book.author.lastName);
    }));

    it('should trigger update', fakeAsync(() => {
      //given
      const book = {
        author: {
          firstName: 'Douglas',
          lastName: 'Crockford',
        },
        title: 'JavaScript. The Good Parts',
        details: {
          pages: 180,
        },
        id: 1,
      };

      const componentNativeElement = fixture.nativeElement as HTMLElement;

      const saveButton =
        componentNativeElement.querySelector<HTMLButtonElement>('button');
      routeDate.next({
        fetchBook: true,
        book,
      });
      tick(2000);
      fixture.detectChanges();
      //when
      expect(saveButton?.disabled).toBeTrue();

      const firstNameControl =
        componentNativeElement.querySelector<HTMLInputElement>('#firstName')!;
      firstNameControl.value = 'TEST';
      firstNameControl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(saveButton?.disabled).toBeFalse();

      saveButton?.click();

      //then
      expect(subscribeSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
