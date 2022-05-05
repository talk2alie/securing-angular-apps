import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loginChanged.subscribe((result) => (this.isLoggedIn = result));
  }

  ngOnInit() {
    this.authService.isLoggedIn().then((result) => (this.isLoggedIn = result));
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
