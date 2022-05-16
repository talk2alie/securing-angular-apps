import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { Constants } from '../constants';
import { CoreModule } from './core.module';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // You want to make sure you are not blindl
        if(!req.url.startsWith(Constants.apiRoot)) {
            return next.handle(req);
        }
        return from(this.authService.getAccessToken()
            .then(accessToken => {
                const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

                // Clones the current header and add your header to the cloned header
                const authReq = req.clone({ headers });
                return next.handle(authReq).toPromise();
            }));
    }
}