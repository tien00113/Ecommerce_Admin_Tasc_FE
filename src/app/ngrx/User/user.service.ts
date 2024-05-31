import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { BASE_URL } from "../../config/api";
import { getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from "./user.action";
import { reqHeaders } from "../../config/requestHeader";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = BASE_URL + "/api";

    constructor(private http: HttpClient, private store: Store) {}

    getUserProfile() {

        return this.http.get(`${this.apiUrl}/user/profile`, {headers: reqHeaders}).pipe(
            map((user: any) => {
                console.log("user profile: ", user);
                return getUserProfileSuccess({ userProfile: user });
            }),
            catchError((error) => {
                return of(
                    getUserProfileFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => this.store.dispatch(action));
    }

    logout() {
        localStorage.removeItem("jwt");
        this.store.dispatch(logoutSuccess());
    }
}