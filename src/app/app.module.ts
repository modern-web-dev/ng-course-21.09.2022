import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './book/components/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/books', pathMatch: 'full' },
        {
          path: 'books',
          loadChildren: () =>
            import('./book/book.module').then((module) => module.BookModule),
        },
        { path: 'not-found', component: NotFoundComponent },
        { path: '**', redirectTo: 'not-found' },
      ],
      { enableTracing: true }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
