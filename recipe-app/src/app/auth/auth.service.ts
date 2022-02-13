import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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
    user = new BehaviorSubject<User | null>(null)
    
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV5KNI-8pj0nf5RMp6B5aMVZyYqWuzcts', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(restData => {
                this.handleAuthentication(
                    restData.email,
                    restData.localId,
                    restData.idToken,
                    +restData.expiresIn
                )
            })
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAV5KNI-8pj0nf5RMp6B5aMVZyYqWuzcts', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(restData => {
                this.handleAuthentication(
                    restData.email,
                    restData.localId,
                    restData.idToken,
                    +restData.expiresIn
                )
            })
        )
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        console.log('tap login'); 
        console.log('testData', expiresIn); 
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );         
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        console.log('user Model', user); 
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
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
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted'
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'The password is invalid or the user does not have a password'
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'The user account has been disabled by an administrator.'
                    break
                default:
                    break;
            }
            
            return throwError(errorMessage);
    }
}