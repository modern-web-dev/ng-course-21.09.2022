import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BookDetailsComponent } from '../components/book-details/book-details.component';

@Injectable()
export class BookNotSavedGuard implements CanDeactivate<BookDetailsComponent> {
  canDeactivate(component: BookDetailsComponent): boolean {
    return component.canExit() ? true : confirm('Changes will be discarded!');
  }
}
