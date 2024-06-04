import { Injectable } from "@angular/core";
import { BASE_URL } from "../../config/api";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { reqHeaders } from "../../config/requestHeader";
import { createCategoryFailure, createCategorySuccess, getAllCategoryByLevelFailure, getAllCategoryByLevelSuccess, getAllCategoryByParentFailure, getAllCategoryByParentSuccess, updateCategoryFailure, updateCategorySuccess } from "./category.action";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = BASE_URL

    constructor(private http: HttpClient, private store: Store) { }

    createCategory(category: any) {
        return this.http.post(`${this.apiUrl}/admin/categorys`, category, { headers: reqHeaders }).pipe(
            map((obj: any) => {
                console.log("đã thêm thành công category: ", obj);
                return createCategorySuccess({ category: category });
            }),
            catchError((error) => {
                console.log("error: ", error);
                return of(
                    createCategoryFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => {
            this.store.dispatch(action);
        })
    }

    updateCategory(category: any, categoryId: number) {
        return this.http.put(`${this.apiUrl}/admin/categorys/${categoryId}`, category, { headers: reqHeaders }).pipe(
            map((obj: any) => {
                console.log("Đã update category thành công: ", obj);

                return updateCategorySuccess({ category: category });
            }),
            catchError((error) => {
                console.log("error update category: ", error);
                return of(
                    updateCategoryFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        ).subscribe((action) => {
            this.store.dispatch(action);
        })
    }

    getAllCategoryByLevel(level: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/categorys/level/${level}`).pipe(
            map((obj: any[]) => {
                console.log("tất cả các category theo level {level}: ", obj);

                return getAllCategoryByLevelSuccess({ category: obj });
            }),
            catchError((error) => {
                console.log("error get category by level: ", error);
                return of(
                    getAllCategoryByLevelFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        )
    }

    getAllCategoryByParent(parentCategoryId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/categorys/${parentCategoryId}`).pipe(
            map((obj: any[]) => {
                console.log("tất cả các phân loại con: ", obj);

                return getAllCategoryByParentSuccess({category: obj});
            }),
            catchError((error) => {
                console.log("error get category by parent id: ", error);

                return of(
                    getAllCategoryByParentFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    )
                )
            })
        )
    }
}