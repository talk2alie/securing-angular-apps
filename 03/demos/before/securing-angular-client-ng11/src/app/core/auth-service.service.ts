import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { SignoutResponse, User, UserManager, UserSettings } from 'oidc-client';
import { Constants } from '../constants';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: CoreModule })
export class AuthService {
  private userManager: UserManager;
  private user: User;
  private loginChangedSubject = new Subject<boolean>();

  loginChanged: Observable<boolean> = this.loginChangedSubject.asObservable();

  constructor() {
    const stsSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: 'openid profile projects-api',
      response_type: 'code',
      post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`
    };
    this.userManager = new UserManager(stsSettings);
  }

  login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then((authenticatedUser) => {
      var isCurrent = !!authenticatedUser && !authenticatedUser.expired;
      if(this.user !== authenticatedUser) {
          this.loginChangedSubject.next(isCurrent);
      }
      this.user = authenticatedUser;
      return isCurrent;
    });
  }

  completeLogin(): Promise<User> {
      return this.userManager.signinRedirectCallback()
                             .then(authenticatedUser => {
                                 this.user = authenticatedUser;
                                 this.loginChangedSubject.next(!!authenticatedUser && !authenticatedUser.expired);
                                 return authenticatedUser;
                             });
  }

  completeLogout(): Promise<SignoutResponse> {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }
}
