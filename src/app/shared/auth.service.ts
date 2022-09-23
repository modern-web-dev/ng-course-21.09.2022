import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  loggedIn = true;
  isLoggedin() {
    return this.loggedIn;
  }
}
