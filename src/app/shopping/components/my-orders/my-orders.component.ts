import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId;
  orders$;
  constructor(private orderService: OrderService, private authService : AuthService) { 
    
  }

  async ngOnInit() {
    this.orders$ = await this.authService.user$
    .switchMap( user => this.orderService.getUserOrders(user.uid))
     
  }

}
