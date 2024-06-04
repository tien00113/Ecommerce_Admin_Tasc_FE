import { createAction, props } from "@ngrx/store";

export const createCategory = createAction('[Category] createCategory', props<{category: any}>());
export const createCategorySuccess = createAction('[Category] createCategory success', props<{category: any}>());
export const createCategoryFailure = createAction('[Category] createCategory failure', props<{error: any}>());

export const updateCategory = createAction('[Category] updateCategory', props<{category: any, categoryId: number}>());
export const updateCategorySuccess = createAction('[Category] updateCategory success', props<{category: any}>());
export const updateCategoryFailure = createAction('[Category] updateCategory failure', props<{error: any}>());

export const getAllCategoryByLevel = createAction('[Category] getAllCategoryByLevel');
export const getAllCategoryByLevelSuccess = createAction('[Category] getAllCategoryByLevel success', props<{category: any[]}>());
export const getAllCategoryByLevelFailure = createAction('[Category] getAllCategoryByLevel failure', props<{error: any}>());

export const getAllCategoryByParent = createAction('[Category] getAllCategoryByParent');
export const getAllCategoryByParentSuccess = createAction('[Category] getAllCategoryByParent success', props<{category: any[]}>());
export const getAllCategoryByParentFailure = createAction('[Category] getAllCategoryByParent failure', props<{error: any}>());