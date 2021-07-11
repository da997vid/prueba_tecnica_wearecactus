// Modules
import { RouterModule, Routes } from '@angular/router'

// Components';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

// Services
import { CanActivateAuthGuard } from './auth.service';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [CanActivateAuthGuard] }
]
