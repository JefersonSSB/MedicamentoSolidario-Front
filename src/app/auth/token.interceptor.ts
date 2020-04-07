import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
<<<<<<< HEAD
    // tslint:disable-next-line:no-shadowed-variable
    constructor(private AuthService: AuthService) { }

    currentUser = this.AuthService.currentUserValue;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.currentUser && this.currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
=======
  constructor(private AuthService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.AuthService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
>>>>>>> 9f403386f7a556ecb2103ad775590addedce5041
        }
      });
    }

    return next.handle(request);
  }
}
