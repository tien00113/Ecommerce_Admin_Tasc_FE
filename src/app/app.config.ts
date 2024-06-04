import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './ngrx/Auth/auth.reducer';
import { userReducer } from './ngrx/User/user.reducer';
import { productReducer } from './ngrx/Product/product.reducer';
import { categoryReducer } from './ngrx/Category/category.reducer';
// import { HttpHeadersInterceptor } from './config/headerInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideStore({
      auth: authReducer,
      user: userReducer,
      product: productReducer,
      category: categoryReducer
    }),

    // { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
  ]
};
