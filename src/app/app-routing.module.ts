import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductResolver } from './core/services/product-resolver';
import { AuthGuard } from './core/guards/auth-guard';
import { AdminGuard } from './core/guards/admin-guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AuthGuard ] },
  { path: 'product/create', component: ProductCreateComponent, canActivate: [ AdminGuard ] },
  { path: 'product/edit/:id',
    component: ProductCreateComponent,
    resolve: { product: ProductResolver },
    canActivate: [ AdminGuard ] },
  { path: 'product/:id', component: ProductDetailComponent, resolve: { product: ProductResolver } },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ ]
})
export class AppRoutingModule { }
