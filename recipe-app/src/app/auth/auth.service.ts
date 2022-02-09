import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; 
}

@Injectable(
    {providedIn: 'root'}
)
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV5KNI-8pj0nf5RMp6B5aMVZyYqWuzcts', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage)
            }
            
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'The email address is already in use by another account.'
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Password sign-in is disabled for this project.'
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                    break
                default:
                    break;
            }
            return throwError(errorMessage);
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAV5KNI-8pj0nf5RMp6B5aMVZyYqWuzcts', {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }
}