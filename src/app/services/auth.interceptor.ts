import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const idToken = localStorage.getItem('id_token');

        if (idToken) {

            // we clone the request because we can not modify it directly.
            // to the clone function we pass an object with the modifications
            // that we want to make.

            // Bearer token means what type of authorization we have.
            const cloned = req.clone({
                headers: req.headers.set("Authorization", 
                    "Bearer " + idToken)

            });

            return next.handle(cloned);

        } else {
            // handle takes the http request which get through the middelware
            // until gets to the browser using the XHR.
            return next.handle(req);
        }
    }

}