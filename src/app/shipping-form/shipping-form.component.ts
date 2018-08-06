import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  userSubscribe: Subscription;
  userId;
  shipping = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
  ) {}

  async ngOnInit() {
    this.userSubscribe = await this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy()
  {
    this.userSubscribe.unsubscribe();
  } 

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result  = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
