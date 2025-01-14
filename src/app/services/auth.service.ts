
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../model/user";
import * as auth0 from 'auth0-js';
import {Router} from "@angular/router";

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
        redirectUri: 'https://localhost:4200/lessons'
    });

    private userSubject = new BehaviorSubject<User>(undefined);

    user$: Observable<User> = this.userSubject.asObservable().pipe(filter(user => !!user));

    constructor(private http: HttpClient, private router: Router) {

    }

    login() {

        this.auth0.authorize();

    }

    signUp() {

    }

    logout() {

    }

    public isLoggedIn() {
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}







