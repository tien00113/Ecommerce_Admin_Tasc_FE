import { Injectable } from "@angular/core";
import { BASE_URL } from "../../config/api";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from "./auth.action";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",

})

export class AuthSerivce {
    private apiUrl = BASE_URL + "/auth";

    constructor(private http: HttpClient, private store: Store, private router: Router) { }

    login(loginData: any) {
        return this.http.post(`${this.apiUrl}/signin`, loginData).pipe(
            map((user: any) => {
                if (user.token) {
                    localStorage.setItem('jwt', user.token);
                }

                console.log("jwt là: ", localStorage.getItem('jwt'))

                return loginSuccess({ user });
            }),
            catchError((error) => {
                localStorage.removeItem("jwt");
                return of(
                    loginFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action))
    }


    register(user: any) {
        return this.http.post(`${this.apiUrl}/signup`, user).pipe(
            map((user: any) => {
                console.log("register user", user);

                if (user.token) {
                    localStorage.setItem('jwt', user.token);
                }

                return registerSuccess({ user });
            }),
            catchError((error) => {
                return of(
                    registerFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

}