import { Component, Input } from '@angular/core';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppinCart;

  constructor(private cartServices: ShoppingCartService) { }

  addToCart() {
    this.cartServices.addToCart(this.product);
  }

  removeToCart() {
    this.cartServices.removeToCart(this.product);
  }
}
