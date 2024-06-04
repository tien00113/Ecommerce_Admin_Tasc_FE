import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../ngrx/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // providers: [ProductService] (gây lỗi đè lên khi click vào container)
})
export class UpdateProductComponent implements OnInit {

  @Input() productDetail: any;

  @Input() data: any;

  updateForm: FormGroup;

  loading: Boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target) && event.target.id == 'update-backdrop') {
      this.productService.closeUpdate();
    }
  }

  constructor(private productService: ProductService, private store: Store<AppState>, private eRef: ElementRef, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: [this.data?.id],
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      price: [this.data?.price || '', Validators.required],
      // category: [this.data?.category || '', Validators.required],
      stock: [this.data?.stock || '', Validators.required],
      size: [this.data?.size || '', Validators.required],
      color: [this.data?.color || '', Validators.required],
      images: [this.data?.images || '', Validators.required]
    });
  }

  async onUpdate() {
  
    const updatedProduct: any = {
      ...this.updateForm.value
    };

    await this.updateProduct(updatedProduct);

    this.onClose();

  }

  updateProduct(product: any) {
    this.productService.updateProduct(product);

    this.store.pipe(select((store) => store.product.product)).subscribe((product) => {
      this.productDetail = product;
      
    });
  }

  onClose() {
    this.productService.closeUpdate();
  }

}
