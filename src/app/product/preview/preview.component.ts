import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { ProductService } from '../../ngrx/Product/product.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PreviewComponent implements OnInit {

  @Input() productDetail: any;

  @Input() data: any

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // debugger

    if (this.eRef.nativeElement.contains(event.target) && event.target.id == 'preview-backdrop') {
      this.productService.closePreview()
    } 
  }

  constructor(private productService: ProductService, private eRef: ElementRef) { }

  ngOnInit() {
  }

  onUpdate() {
    this.productService.closePreview(true)
  }
}
