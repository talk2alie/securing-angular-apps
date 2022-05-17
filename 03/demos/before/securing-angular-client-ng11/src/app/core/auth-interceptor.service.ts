import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth-service.service';
import { Constants } from '../constants';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

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

                // To handle authorization errors, pipe into the HTTP Response
                // and tap the response (in this case, an HttpEvent). For the
                // success state, do nothing. But for the error state, redirect to an error page
                // or do anything you like. Remember you have to make a decision about what 
                // authentication issues to report to the user
                return next.handle(authReq).pipe(tap(_ => {}, error => {
                    var respError = error as HttpErrorResponse;
                    if(respError && (respError.status == 401 || respError.status == 403)) {
                        this.router.navigate(['/unauthorized']);
                    }
                })).toPromise();
            }));
    }
}