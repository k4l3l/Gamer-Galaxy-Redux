import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

import { reducers } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+store/auth/effects';
import { ProdEffects } from './+store/product/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AppRouterSerializer } from './core/app-router-serializer';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog.component';
import { ConnectFormDirective } from './core/directives/connect-form-directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    DeleteProductDialogComponent,
    ConnectFormDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      ProdEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      serializer: AppRouterSerializer
    }),
    StoreDevtoolsModule.instrument({}),
    SharedModule,
  ],
  providers: [],
  entryComponents: [DeleteProductDialogComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
