import { createReducer, on } from "@ngrx/store";
import { getUserProfile, getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from "./user.action";

const initialState = {
    userProfile: null,
    loading: false,
    error: null,
}

export const userReducer = createReducer(
    initialState,
    
    on(getUserProfile, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(getUserProfileSuccess, (state, {userProfile}) => ({
        ...state,
        loading: false,
        userProfile: userProfile,
        error: null,

    })),
    on(getUserProfileFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(logoutSuccess, () => (initialState))
)