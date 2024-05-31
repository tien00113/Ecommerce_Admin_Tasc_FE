import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthSerivce } from "../ngrx/Auth/auth.service";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor {

    /**
     * 
     *
     */
    constructor(private authService: AuthSerivce) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const jwtToken = localStorage.getItem("jwt");

        const modifiedReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        return next.handle(modifiedReq)
        // .pipe(
        //     catchError(err => {
        //         if (err.status === "500") {
        //             this.authService.logout();
        //         }
        //         return throwError(() => err);
        //     })
        // );

    }


}