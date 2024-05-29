import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";
import { getAllProductFailure, getAllProductSuccess } from "./product.action";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = BASE_URL

    constructor(private http: HttpClient, private store: Store){}

    getAllProduct(filter: ProductFilterRequest) {
        return this.http.post<any>(`${this.apiUrl}/allproduct`, filter).pipe(
            map((pageable: any) => {
                console.log("pageable all product: ", pageable);
                return getAllProductSuccess({pageable: pageable});
            }),
            catchError((error) => {

                console.log("lỗi rồi: ", error);
                return of (
                    getAllProductFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )

            })
        ).subscribe((action) => this.store.dispatch(action));
    }

    createProduct(product: any) {
        
    }
}