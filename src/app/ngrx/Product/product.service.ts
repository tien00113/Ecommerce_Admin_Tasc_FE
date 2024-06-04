import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, catchError, map, of } from "rxjs";
import { BASE_URL } from "../../config/api";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";
import { createProductFailure, createProductSuccess, getAllProductFailure, getAllProductSuccess, getProductDetailFailure, getProductDetailSuccess, updateProductFailure, updateProductSuccess } from "./product.action";
import { reqHeaders } from "../../config/requestHeader";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = BASE_URL

    private _closePreview$ = new Subject();
    public closePreview$ = this._closePreview$.asObservable();

    closePreview(reason?: any) {
        this._closePreview$.next(reason);
    }

    private _closeUpdate$ = new Subject();
    public closeUpdate$ = this._closeUpdate$.asObservable();

    closeUpdate(reason?: any) {
        this._closeUpdate$.next(reason);
    }

    constructor(private http: HttpClient, private store: Store) { }

    getAllProduct(filter: ProductFilterRequest) {
        return this.http.post<any>(`${this.apiUrl}/allproduct`, filter).pipe(
            map((pageable: any) => {
                console.log("pageable all product: ", pageable);
                return getAllProductSuccess({ pageable: pageable });
            }),
            catchError((error) => {

                console.log("lỗi: ", error);
                return of(
                    getAllProductFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )

            })
        ).subscribe((action) => this.store.dispatch(action));
    }

    createProduct(product: any) {
        return this.http.post(`${this.apiUrl}/admin/product/create`, product, { headers: reqHeaders }).pipe(
            map((obj: any) => {
                console.log("object create: ", obj);
                return createProductSuccess({ product: obj });
            }),
            catchError((error) => {
                console.log("error: ", error);
                return of(
                    createProductFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => {
            this.store.dispatch(action);
        })
    };

    getProductDetail(productId: any) {
        console.log("đã gọi đến hàm")
        return this.http.get(`${this.apiUrl}/product/${productId}`).pipe(
            map((productDetail: any) => {
                console.log("product detail: ", productDetail);
                return getProductDetailSuccess({ productDeatail: productDetail })
            }),
            catchError((error) => {
                console.log("error get product detail: ");

                return of(
                    getProductDetailFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => {
            this.store.dispatch(action);
        })
    };

    updateProduct(product: any) {
        return this.http.put(`${this.apiUrl}/admin/product/update`, product, { headers: reqHeaders }).pipe(
            map((obj: any) => {
                console.log("update thành công: ", obj);

                return updateProductSuccess({ product: product })
            }),
            catchError((error) => {
                console.log("error update product");

                console.log("dữ liệu nhận: ", product)
                
                console.log("header: ", reqHeaders);

                return of(
                    updateProductFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => {
            this.store.dispatch(action);
        })
    }
}