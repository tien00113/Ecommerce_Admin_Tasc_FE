import { createReducer, on } from "@ngrx/store"
import { createCategory, createCategoryFailure, createCategorySuccess, getAllCategoryByLevel, getAllCategoryByLevelFailure, getAllCategoryByLevelSuccess, getAllCategoryByParent, getAllCategoryByParentFailure, getAllCategoryByParentSuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from "./category.action"

const initialState = {
    category: null,
    loading: false,
    error: null,
    categorys: [],
    childCategorys: [],
    child2Categorys: []
}

export const categoryReducer = createReducer(
    initialState,
    //create category
    on(createCategory, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(createCategorySuccess, (state, {category}) => ({
        ...state,
        loading: false,
        category: category,
        error: null,
    })),
    on(createCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    //update
    on(updateCategory, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(updateCategorySuccess, (state, {category}) => ({
        ...state,
        loading: false,
        category: category,
        error: null
    })),
    on(updateCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    //getAllCategoryByLEvel

    on(getAllCategoryByLevel, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    // on(getAllCategoryByLevelSuccess, (state, {category}) => ({
    //     ...state,
    //     loading: false,
    //     categorys: category,
    //     error: null
    // })),
    on(getAllCategoryByLevelSuccess, (state, { category }) => {
        // const { categorys } = state;
        // const { childCategorys, child2Categorys } = state;

        if (category.length > 0) {
            const level = category[0].level;
            if (level === 1) {
                return {...state, categorys: category};
            } else if (level === 2) {
                return { ...state, childCategorys: category };
            } else if (level === 3) {
                return { ...state, child2Categorys: category };
            }
        }

        return { ...state, categorys: category };
    }),
    on(getAllCategoryByLevelFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    //getAllCategoryByParent

    on(getAllCategoryByParent, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(getAllCategoryByParentSuccess, (state, {category}) => ({
        ...state,
        loading: false,
        childCategorys: category,
        error: null
    })),
    on(getAllCategoryByParentFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

)