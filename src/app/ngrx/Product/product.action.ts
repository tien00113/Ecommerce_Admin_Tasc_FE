import { createAction, props } from "@ngrx/store";
import { ProductFilterRequest } from "../../models/ProductFilterRequest";

export const getAllProduct = createAction('[Product] getAllProduct', props<{filter: ProductFilterRequest }>());
export const getAllProductSuccess = createAction('[Product] getAllProduct success', props<{pageable: any}>());
export const getAllProductFailure = createAction('[Product] getAllProduct failure', props<{error: any}>());

export const createProduct = createAction('[Product] createProduct', props<{product: any}>());
export const createProductSuccess = createAction('[Product] createProduct success', props<{pageable: any}>());
export const createProductFailure = createAction('[Product] createProduct failure', props<{error: any}>());

export const updateProduct = createAction('[Product] updateProduct', props<{filter: ProductFilterRequest }>());
export const updateProductSuccess = createAction('[Product] updateProduct success', props<{pageable: any}>());
export const updateProductFailure = createAction('[Product] updateProduct failure', props<{error: any}>());