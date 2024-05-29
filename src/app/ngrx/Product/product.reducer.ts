import { createReducer, on } from "@ngrx/store"
import { getAllProduct, getAllProductFailure, getAllProductSuccess } from "./product.action"

const initialState = {
    pageable: null,
    product: null,
    loading: false,
    error: null,
}

export const productReducer = createReducer(
    initialState,
    on(getAllProduct, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(getAllProductSuccess, (state, {pageable}) => ({
        ...state,
        loading: false,
        pageable
    })),

    on(getAllProductFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    }))
)