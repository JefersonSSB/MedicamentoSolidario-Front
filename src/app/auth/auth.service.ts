import { Injectable } from '@angular/core';
// npm install jsonwebtoken
//import decode from 'jwt-decode';
@Injectable()
export class AuthService {  public getToken(): string {
    return localStorage.getItem('token');
}  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
}}
