import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },

      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent, 
  ],
  exports: [
    //ProductsComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent
  ]
})
export class ShoppingModule { }
