import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories$;
  activecat: string;
  filterProduct: Product[] = [];
  cart$: Observable<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
      this.populateProduct();
    }

  private populateProduct()
  {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.activecat = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter()
  {
    
        this.filterProduct = (this.activecat) ? this.products.filter(p => p.category === this.activecat) : this.products;
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
  

}
