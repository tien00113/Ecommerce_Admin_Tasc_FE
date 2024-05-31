import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './authen/register/register.component';
import { AuthenComponent } from './authen/authen.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ProductComponent },
    {
        path: "login", component: AuthenComponent
    }
    
];
