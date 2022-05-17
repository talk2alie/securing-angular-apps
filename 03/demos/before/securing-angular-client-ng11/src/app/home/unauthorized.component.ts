import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth-service.service';

@Component({
    selector: 'selector-name',
    templateUrl: 'unauthorized.component.html'
})

export class UnAuthorizedComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    logout(): void {
        this.authService.logout();
    }
}