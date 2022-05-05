import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth-service.service';

@Component({
    selector: 'app-signin-callback',
    template: `<div></div>`
})
export class SigninRedirectCallbackComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { 
        // You could also capture where the user was gping before redirect to 
        // login and then navigate there here instead of to the home page
        this.authService.completeLogin().then(user => this.router.navigate(['/'], {replaceUrl: true }));
    }
}