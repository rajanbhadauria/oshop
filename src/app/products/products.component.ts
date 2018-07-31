import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  categories$;
  activecat: string;
  filterProduct: Product[] = [];
  cart: any;
  subscribe: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {

    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.activecat = params.get('category');
        this.filterProduct = (this.activecat) ? this.products.filter(p => p.category === this.activecat) : this.products;
      });

  }
  async ngOnInit() {
    this.subscribe = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }
  ngOnDestroy() {
      this.subscribe.unsubscribe();
  }

}
