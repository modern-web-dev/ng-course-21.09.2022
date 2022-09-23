import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private readonly router: Router){

    this.router.events.subscribe(event=>{
        if(event instanceof NavigationEnd){
        
        }
    });
  }
}
