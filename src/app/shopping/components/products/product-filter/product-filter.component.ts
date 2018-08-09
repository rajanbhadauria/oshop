import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('activecat') activecat;
  constructor(private categoryService: CategoryService) {
    // listing category
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {
  }

}
