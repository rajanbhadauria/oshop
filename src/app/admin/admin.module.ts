import { SharedModule } from 'shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGaurd } from './services/admin-auth-gaurd.service';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGaurd]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGaurd]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGaurd]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGaurd]
      },
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
  ],
  exports: [
    ProductFormComponent,
  ]
})
export class AdminModule { }
