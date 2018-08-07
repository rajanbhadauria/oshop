import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppinCart: ShoppingCart;

  constructor(private cartServices: ShoppingCartService) { }

   addToCart() {
     this.cartServices.addToCart(this.product);
   }

  // removeToCart() {
  //   this.cartServices.removeToCart(this.product);
  // }

}
