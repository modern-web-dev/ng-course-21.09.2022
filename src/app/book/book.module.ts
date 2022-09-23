import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { BookService } from './services/book.service';
import { BookResolver } from './resolvers/book.resolver';
import { BookNotSavedGuard } from './resolvers/book-not-saved.guard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
    NotFoundComponent,
  ],
  exports: [BookOverviewComponent],
  providers: [BookService, BookResolver, BookNotSavedGuard],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookOverviewComponent,
        title: 'Books',
      },

      {
        path: 'new',
        component: BookDetailsComponent,
        title: 'Add Book',
        data: { fetchBook: false },
        canDeactivate: [BookNotSavedGuard],
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        title: 'Edit Book',
        data: { fetchBook: true },
        resolve: { book: BookResolver },
        canDeactivate: [BookNotSavedGuard],
      },
    ]),
  ],
})
export class BookModule {}
