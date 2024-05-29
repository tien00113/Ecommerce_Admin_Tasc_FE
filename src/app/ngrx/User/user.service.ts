import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BASE_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { getUserProfileFailure, getUserProfileSuccess } from "./user.action";
import { catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = BASE_URL + "/api";

    headers: any;

    constructor(private http: HttpClient, private store: Store) {}

    getUserProfile() {
        let headers = new HttpHeaders();
        const token = localStorage.getItem("jwt");

        if (token) {
            headers = headers.set("Authorization", `Bearer ${token}`);
        }

        return this.http.get(`${this.apiUrl}/user/profile`, { headers }).pipe(
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
}