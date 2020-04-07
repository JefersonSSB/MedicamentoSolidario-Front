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
    // tslint:disable-next-line:no-shadowed-variable
    constructor(private AuthService: AuthService) { }

    currentUser = this.AuthService.currentUserValue;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.currentUser && this.currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.currentUser.token}`
                }
            });

        }
        return next.handle(request);
      });
    }
  }
}
