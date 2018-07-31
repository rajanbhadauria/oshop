import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './../models/product';
import { Item } from './../models/item';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({ dateCreated: new Date().getTime() });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges().map(x => {
        let y = x as ShoppingCart;
        console.log(y);
        return new ShoppingCart(y.items);
      });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateCartItem(product, 1);
  }

  async removeToCart(product: Product) {
    this.updateCartItem(product, -1);
  }

  private async updateCartItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCart();
    // checking product is exists in cart or not.
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      const newItem = item as Item;
      const qty = (newItem) ? newItem.quantity : 0;
      item$.update({ product: product, quantity: qty + change });
    });
  }
}
