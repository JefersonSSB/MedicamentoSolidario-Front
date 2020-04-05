import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Usuario } from "../models/usuario";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "https://medicamento-back.herokuapp.com";
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient) {
<<<<<<< HEAD
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
=======
    this.currentUserSubject = new BehaviorSubject<Usuario>(
      JSON.parse(localStorage.getItem("usuario"))
    );
>>>>>>> dc5d48c9e6d55dd79893b0b48da9dac3e9af2377
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
<<<<<<< HEAD
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('usuario', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
=======
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("usuario", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
>>>>>>> dc5d48c9e6d55dd79893b0b48da9dac3e9af2377
  }

  logout() {
    // remove user from local storage to log user out
<<<<<<< HEAD
    localStorage.removeItem('usuario');
=======
    localStorage.removeItem("usuario");
>>>>>>> dc5d48c9e6d55dd79893b0b48da9dac3e9af2377
    this.currentUserSubject.next(null);
  }
}
