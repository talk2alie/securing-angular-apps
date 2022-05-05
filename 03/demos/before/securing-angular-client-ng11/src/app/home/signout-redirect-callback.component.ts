import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth-service.service';

@Component({
    selector: 'signout-redirect-callback',
    template: `<div></div>`
})

export class SignoutRedirectCallbackComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.completeLogout().then(response => {
            this.router.navigate(['/'], { replaceUrl: true });
        });
     }
}