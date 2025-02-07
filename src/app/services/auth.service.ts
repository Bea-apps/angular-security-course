
import {shareReplay, filter, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../model/user";
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";
import * as moment from 'moment';

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: ''
};

const AUTH_CONFIG = {
    clientID: 'AvPIhCSzNvDH7LlJkFeiJCRnspM9V8F2',
    domain: "dev-kx0725jblw8655rw.us.auth0.com"
};


@Injectable()
export class AuthService {

    // by using 'redirectUri' the password will never be store in the
    // memory website => Auth0 take care about it: we don´t receive 
    // the password, we don´t have a private secret key installed 
    // in our servers.
    //
    // Whenever the authetication is successfull we should be redirected
    // to the resdirectUri (https://localhost:4200/lessons)
    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: 'https://localhost:4200/lessons',
        scope: 'openid email ' // to ask the user permission for have access to his email
    });

    // user$: Observable<User> = this.userSubject.asObservable().pipe(filter(user => !!user));

    // with 'subject' we initialized the user preferences with the value 'undefined'
    private subject = new BehaviorSubject<User>(undefined);

    // we emit all values excepts the initial which is undefined
    user$: Observable<User> = this.subject.asObservable()
                                           .pipe(filter(user => !!undefined));


    constructor(private http: HttpClient, private router: Router) {
        if (this.isLoggedIn()) {
            // we fetch the user preferences from the backend.
            this.userInfo();
        }

    }

    login() {

        this.auth0.authorize({initialScreen: 'login'});

    }

    signUp() {
        this.auth0.authorize({initialScreen: 'signUp'});
    }

    retrieveAuthInfoFromUrl() {
        // parseHash returns the result of the authentication operation
        // or in case an error occurs, the error.
        this.auth0.parseHash((err, authResult) => {

            if(err) {
                console.log("Could not parse the hash", err);
                return;
            } else if(authResult && authResult.idToken) {
                window.location.hash = '';
                console.log("Authentication successful, authResult", authResult);

                // example to get more user info from auth0 url.
                // this.auth0.client.userInfo(authResult.accessToken, (err, userProfile) => {
                // });

                this.setSession(authResult);

                // save a new user in the DB and applies
                // at default set of preferencies.
                // In case of the login (user exists),
                // we are going to send back the user preferences without
                // save the user data on the DB cause we already have saved it
                // before.
                this.userInfo();

            }

        }); 

    }
    userInfo() {
        // we pass null because only have the user email and it´s
        // already passed in the request.
        this.http.put<User>('/api/userinfo', null)
        .pipe(
            shareReplay(),
            tap(user => this.subject.next(user))
        ).subscribe();
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.router.navigate(['/lessons']);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    private setSession(authResult) {

        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

}







