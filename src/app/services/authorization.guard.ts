import { map, first, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import * as _ from "lodash";
import { Injectable } from '@angular/core';

/**
 *  The guard is going to be execute before the root transition takes place.
 * */ 
@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private allowedRoles: string[],
        private authService: AuthService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean>  {

           return this.authService.user$.pipe(
            map(user => _.intersection(this.allowedRoles, user.roles).length > 0),
            first(), // take the first value of the observable and completes which allow the route transition to go through.
            tap(allowed => {
                if (!allowed) {
                    this.router.navigateByUrl('/'); // redirect the user to the lessons route.

                }
            }) // tap or do operator for redirect to the user to the root route
                 // when _.intersection(this.allowedRoles, user.roles).length is 0
        )
    }

}