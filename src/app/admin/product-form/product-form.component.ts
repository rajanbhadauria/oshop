import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  product = {};
  id;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private catService: CategoryService,
    private productService: ProductService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }

  saveProduct(product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  removeProduct(productId) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.deleteProduct(productId);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
    this.categories$ = this.catService.getAll();
  }
}
