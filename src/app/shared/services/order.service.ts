import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) {
  }

  async getOrders()
  {
    return await this.db.list('/orders/', ref=>ref.orderByChild('datePlaced')).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getUserOrders(userId)
  {
    
    return this.db.list('/orders', ref => 
    ref.orderByChild('userId').equalTo(userId)
    ).snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

   async placeOrder(order) {
    let result =  await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
   }

}
