import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BASE_URL } from './base-url.token';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './jwt.interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';

@NgModule({
  declarations: [AppComponent],

  imports: [
    CoreModule,
    SharedModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/books', pathMatch: 'full' },
      {
        path: 'books',
        loadChildren: () =>
          import('./book/book.module').then((module) => module.BookModule),
      },
      { path: 'not-found', component: NotFoundComponent, title: 'Not Found' },
      { path: '**', redirectTo: 'not-found' },
    ]),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.BASE_API },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
