import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductFilterRequest } from '../models/ProductFilterRequest';
import { ProductService } from '../ngrx/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductComponent implements OnInit {

  pageable: any;

  constructor(private productService: ProductService, private store: Store<AppState>) { }

  ngOnInit() {
    const filter: ProductFilterRequest = {
      minPrice: 0,
      maxPrice: 0,
      categoryId: null,
      color: null,
      pageable: {
        page: 0,
        size: 10,
        sort: [
          {
            property: 'price',
            direction: 'ASC'
          }
        ]
      },
    }
    this.productService.getAllProduct(filter);

    this.store.pipe(select((store) => store.product)).subscribe((products) => {
      this.pageable = products
    })
  }

  show: Boolean = false;

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

}
