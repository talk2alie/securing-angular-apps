import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { SignoutResponse, User, UserManager } from 'oidc-client';
import { Constants } from '../constants';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
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
      // Auth0 requires the below settings
      // When these settings are used, they override IDS original discovery settings
      // Auth0 does not put these settings in the discovery doc since each instance is separate
      // To get back a JWT for access tokens, you need to add ?audience=<API ID> to the authorize endpoint
      // metadata: {
      //   issuer: Constants.stsAuthority,
      //   authorization_endpoint: `${Constants.stsAuthority}authorize?audience=projects-api`,
      //   jwks_uri: `${Constants.stsAuthority}.well-known/jwks.json`,
      //   token_endpoint: `${Constants.stsAuthority}oauth/token`,
      //   userinfo_endpoint: `${Constants.stsAuthority}userinfo`,
      //   end_session_endpoint: `${Constants.stsAuthority}v2/logout?client_id=${Constants.clientId}&returnTo=${encodeURI(Constants.clientRoot)}signout-callback`
      // }
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

  

  getAccessToken() : Promise<string> {
    return this.userManager.getUser()
      .then(user => {
        if(!!user && !user.expired) {
          return user.access_token;
        }

        return null;
      });
  }
}
