import { createAction, props } from "@ngrx/store";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";

export const getAllProduct = createAction('[Product] getAllProduct', props<{filter: ProductFilterRequest }>());
export const getAllProductSuccess = createAction('[Product] getAllProduct success', props<{pageable: any}>());
export const getAllProductFailure = createAction('[Product] getAllProduct failure', props<{error: any}>());

export const createProduct = createAction('[Product] createProduct', props<{product: any}>());
export const createProductSuccess = createAction('[Product] createProduct success', props<{product: any}>());
export const createProductFailure = createAction('[Product] createProduct failure', props<{error: any}>());

export const updateProduct = createAction('[Product] updateProduct', props<{product: any }>());
export const updateProductSuccess = createAction('[Product] updateProduct success', props<{product: any}>());
export const updateProductFailure = createAction('[Product] updateProduct failure', props<{error: any}>());

export const getProductDetail = createAction('[Product] getProductDetail');
export const getProductDetailSuccess = createAction('[Product] getProductDetail success', props<{productDeatail: any}>());
export const getProductDetailFailure = createAction('[Product] getProductDetail failure', props<{error: any}>());