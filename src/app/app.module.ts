import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'shared/services/auth.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { UserService } from 'shared/services/user.service';
import { AdminAuthGaurd } from './admin/services/admin-auth-gaurd.service';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    DataTableModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },

      ])
  ],
  providers: [AuthService, AuthGuard, UserService, AdminAuthGaurd, CategoryService, ProductService, ShoppingCartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
