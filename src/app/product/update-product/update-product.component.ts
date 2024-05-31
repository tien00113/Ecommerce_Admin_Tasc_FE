import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../ngrx/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService]
})
export class UpdateProductComponent implements OnInit, OnChanges {

  @Input() productDetail: any;

  constructor(private productService: ProductService, private store: Store<AppState>) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.productDetail)
  }

  ngOnInit() { }

  onUpdate() {
    this.productService.closePreview(true)
  }

  updateProduct(product: any) {
    this.productService.updateProduct(product);

    this.store.pipe(select((store) => store.product.product)).subscribe((product) => {

      this.productDetail = product;

    });
  }

}
