import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { BookService } from './services/book.service';
import { BookResolver } from './resolvers/book.resolver';
import { BookNotSavedGuard } from './resolvers/book-not-saved.guard';

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
    RouterModule.forChild([
      { path: '', component: BookOverviewComponent },
      {
        path: 'new',
        component: BookDetailsComponent,
        canDeactivate:[BookNotSavedGuard],
        data: { fetchBook: false },
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        canDeactivate:[BookNotSavedGuard],
        data: { fetchBook: true },
        resolve: { book: BookResolver },
      },
    ]),
  ],
})
export class BookModule {}
