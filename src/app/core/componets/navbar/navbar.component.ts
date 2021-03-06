import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cartItemsCount: number;
  carts$: Observable<ShoppingCart>;
  showNav: boolean = false;
  constructor(public auth: AuthService, private cartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.carts$ = await this.cartService.getCart();
  }
  toggleNav()
  {
    this.showNav = !this.showNav;
  }

}

