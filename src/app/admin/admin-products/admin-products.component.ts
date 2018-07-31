import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../../models/product';
import { DataTableResource } from 'angular5-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResourse: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      pro => {
        this.products = pro;
        this.initDatatable(pro);
      });
  }

  private initDatatable(product: Product[]) {
    this.tableResourse = new DataTableResource(product);
    this.tableResourse.query({ offset: 0 }).then(items => this.items = items);
    this.tableResourse.count().then(count => this.itemCount = count);
  }
  reloadItems(params) {
    if (!this.tableResourse) {
      return;
    }

    this.tableResourse.query(params).then(items => this.items = items);
  }
  ngOnInit() {
  }

  searchProduct(key) {
    const filtered_product = (key) ? this.products.filter(p => p.title.toLowerCase().includes(key.toLowerCase())) : this.products;
    this.initDatatable(filtered_product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
