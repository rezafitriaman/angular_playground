import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { User } from "../models/User";
import { DataStorageService } from "../shared/storage/data-storage.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private dataStorage: DataStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.dataStorage.user.pipe(
            take(1),
            exhaustMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid';
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', userToken)
                });
                return next.handle(modifiedReq);
            })
        )
    }
}