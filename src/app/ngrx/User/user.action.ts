import { createAction, props } from "@ngrx/store";

export const getUserProfile = createAction('[User] getUserProfile');
export const getUserProfileSuccess = createAction('[User] getUserProfile success', props<{userProfile: any}>());
export const getUserProfileFailure = createAction('[User] getUserProfile failure', props<{error: any}>());

export const logoutSuccess = createAction("[User] logout success");