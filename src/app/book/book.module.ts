import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';
import { RouterModule } from '@angular/router';
import { BookService } from './services/book.service';
import { BookResolver } from './resolvers/book.resolver';
import { BookNotSavedGuard } from './resolvers/book-not-saved.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../shared/core.module';

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent,
  ],
  exports: [BookOverviewComponent],
  providers: [BookService, BookResolver, BookNotSavedGuard],
  imports: [
    SharedModule,
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
