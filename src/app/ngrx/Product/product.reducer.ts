import { createReducer, on } from "@ngrx/store"
import { createProduct, createProductFailure, createProductSuccess, getAllProduct, getAllProductFailure, getAllProductSuccess, getProductDetail, getProductDetailFailure, getProductDetailSuccess, updateProduct, updateProductFailure, updateProductSuccess } from "./product.action"
import { state } from "@angular/animations"

const initialState = {
    pageable: null,
    product: null,
    products: [],
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
        pageable: pageable,
        products: pageable.content
    })),

    on(getAllProductFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    //create product

    on(createProduct, (state) => ({...state, loading: true, error: null})),
    on(createProductSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        // pageable: {
        //     ...state.pageable,
        //     content: [product, ...state?.pageable?.content]
        // },
        products: product, ...state.products
    })),

    on(createProductFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),

    //detail

    on(getProductDetail, (state) => ({
        ...state,
        loading:true,
        error: null
    })),
    on(getProductDetailSuccess, (state, {productDeatail}) => ({
        ...state,
        loading: false,
        product: productDeatail,
        error: null
    })),
    on(getProductDetailFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),


    //update product

    on(updateProduct, (state) => ({
        ...state,
        loading:true,
        error: null
    })),
    on(updateProductSuccess, (state, {product}) => ({
        ...state,
        loading:false,
        product: product,
        error: null,
    })),
    on(updateProductFailure, (state, {error}) => ({
        ...state,
        loading:false,
        error: error
    }))
)