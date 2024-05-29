import {createAction, props} from "@ngrx/store";

export const login = createAction('[Auth] login', props<{email: string, password: string}>());
export const loginSuccess = createAction('[Auth] login success', props<{user: any}>());
export const loginFailure = createAction('[Auth] login failure', props<{error: any}>());

export const register = createAction('[Auth] register', props<{user: any}>());
export const registerSuccess = createAction('[Auth] register success', props<{user: any}>());
export const registerFailure = createAction('[Auth] register failure', props<{error: any}>());

