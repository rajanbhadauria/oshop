import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
    
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ]
})
export class SharedModule { 

}  
