import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductFilterRequest } from '../models/ProductFilterRequest';
import { ProductService } from '../ngrx/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { PreviewComponent } from './preview/preview.component';
import { UpdateProductComponent } from './update-product/update-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadComponent, PreviewComponent, UpdateProductComponent]
})
export class ProductComponent implements OnInit {

  @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  @ViewChild('preview', { read: ViewContainerRef, static: true })
  componentRef: ComponentRef<PreviewComponent>;
  componentcopyRef: ComponentRef<UpdateProductComponent>;
  obj: any;

  totalPages!: number;

  pageNo: number = 0;

  currentPage: number = 0;

  filter: ProductFilterRequest = {
    minPrice: 0,
    maxPrice: 0,
    categoryId: null,
    color: null,
    pageableDTO: {
      page: this.pageNo,
      size: 10,
      sort: [
        // {
        //   property: 'price',
        //   direction: 'ASC'
        // }
      ]
    }
  }

  products!: any[];

  selectedFile: File | null = null;
  uploadUrl: string | undefined;

  productDetail: any;

  drawer_index: any;

  showProductPreview: Boolean = false;

  constructor(
    private productService: ProductService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private container: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.productService.getAllProduct(this.filter);

    this.store.pipe(select((store) => store.product.pageable)).subscribe((pageable) => {
      this.obj = pageable;

      this.totalPages = pageable?.totalPages;
      this.products = pageable?.content;
      this.currentPage = pageable?.number;
    });

    this.productService.closePreview$.subscribe(res => {
      this.container.clear();
      if (this.componentRef) {
        this.componentRef.destroy();
      }
      if (res) {
        //goi lai du lieu neu an updates

      }
    })
  }

  getRange(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  show: Boolean = false;

  showModal() {
    this.show = true;
  }

  closeModal() {
    this.show = false;
  }

  createProductForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(6)],
    price: [null, [Validators.required, Validators.min(0)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    size: ['', Validators.required],
    color: ['', Validators.required],
    description: [''],
    // category: ['', Validators.required],
    images: ['', Validators.required]
  })

  loading: Boolean = false;

  async addProductSubmit(): Promise<void> {
    try {
      console.log("value submit: ", this.createProductForm.value);
      await this.productService.createProduct(this.createProductForm.value);

      this.closeModal();

    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async saveProduct() {
    if (this.uploadComponent) {
      this.loading = true;
      // await this.uploadComponent.onSave();
      // await this.addProductSubmit();
      const urls = await this.uploadComponent.uploadFiles();

      const imageUrlString = urls.join(',');
      this.createProductForm.patchValue({
        images: imageUrlString
      });
      await this.addProductSubmit();
      console.log(this.createProductForm.value);
      this.loading = false;
      this.closeModal();
    }
    else {
      alert('Form không hợp lệ hoặc không có tệp nào được chọn.');
    }
  }

  getPageNumber(pageNo: number) {
    this.filter.pageableDTO.page = pageNo - 1;

    this.productService.getAllProduct(this.filter);

    this.store.pipe(select((store) => store.product.pageable)).subscribe((pageable) => {
      this.obj = pageable;

      this.totalPages = pageable.totalPages;

    })
  };


  showPreview(productId: any) {
    this.productService.getProductDetail(productId);

    this.store.pipe(select((store) => store.product.product)).subscribe((product) => {
      this.productDetail = product;
      this.container.clear()
      this.componentRef = this.container.createComponent(PreviewComponent)
      this.componentRef.setInput('data', this.productDetail)
      this.cdr.detectChanges()
    });

  }

  showUpdate(productId: any) {
    this.productService.getProductDetail(productId);

    this.store.pipe(select((store) => store.product.product)).subscribe((product) => {

      this.productDetail = product;
      this.container.clear()
      this.componentcopyRef = this.container.createComponent(UpdateProductComponent)
      this.componentcopyRef.setInput('data', this.productDetail)
      this.cdr.detectChanges()
    });
  }
}
