import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CFPD';
  showFiller = false;
  public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(public authService: AuthService) {
  }
}
