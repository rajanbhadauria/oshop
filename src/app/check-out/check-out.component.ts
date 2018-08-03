import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth.service';
import { Order } from './../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart;
  cartSubscribe: Subscription;
  userSubscribe: Subscription;
  userId;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscribe = cart$.subscribe(cart => this.cart = cart);
    this.userSubscribe = await this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy()
  {
    this.cartSubscribe.unsubscribe();
    this.cartSubscribe.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result  = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
