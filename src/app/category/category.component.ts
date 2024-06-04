// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { CategoryService } from '../ngrx/Category/category.service';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Observable, firstValueFrom } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { AppState } from '../models/AppState';
// import { getAllCategoryByParent, getAllCategoryByParentFailure, getAllCategoryTopLevel, getAllCategoryTopLevelFailure } from '../ngrx/Category/category.action';

// @Component({
//   selector: 'app-category',
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule]
// })
// export class CategoryComponent implements OnInit {

//   show: Boolean = false;

//   showSelect: Boolean = false;

//   loading: Boolean = false;

//   categories$: Observable<any[]>

//   childCategories$: Observable<any[]>

//   categoryForm: FormGroup;

//   constructor(private categoryService: CategoryService,  private fb: FormBuilder, private store: Store<AppState>) {

//     this.categories$ = this.store.select(state => state.category.categorys);
//     this.childCategories$ = this.store.select(state => state.category.childCategorys)
//     this.categoryForm = this.fb.group({
//       name: ['', Validators.required],
//       categoryId1: [null],
//       categoryId2: [null],
//       parentCategoryId: [null]
//     });
//   }

//   ngOnInit() {
//     this.store.dispatch(getAllCategoryTopLevel());
//     // this.store.dispatch(getAllCategoryByParent())
//     this.getAllCategoryTopLevel();
//   }

//   onOpen(){
//     this.show = true;
//     this.categoryForm.patchValue({ categoryId1: null, categoryId2: null });
//   }

//   onClose(){
//     this.show = false;
//   }

//   onOpenSelect(){
//     this.showSelect = true;
//   }

//   onCloseSelect(){
//     this.showSelect = false;
//   }

//   // onSelectChange(event: Event) {
//   //   const selectedValue = (event.target as HTMLSelectElement).value;
//   //   this.showSelect = selectedValue !== "";
//   //   this.getAllCategoryByParent(selectedValue);
//   // }

//   onSelectChange(event: Event, controlName: string) {
//     const selectedValue = (event.target as HTMLSelectElement).value;
//     if (controlName === 'categoryId1') {
//       this.categoryForm.patchValue({ categoryId2: null });
//       this.showSelect = selectedValue !== "";
//       this.getAllCategoryByParent(selectedValue);
//     }
//     if (controlName === 'categoryId2') {
//       this.categoryForm.patchValue({ parentCategoryId: selectedValue || this.categoryForm.value.categoryId1 });
//     } else {
//       this.categoryForm.patchValue({ parentCategoryId: this.categoryForm.value.categoryId1 });
//     }
//   }

//   resetForm() {
//     this.categoryForm.reset({
//       name: '',
//       categoryId1: null,
//       categoryId2: null,
//       parentCategoryId: null
//     });
//     this.showSelect = false;
//   }

//   async createCategory(){
//     try {
//       this.loading = true;
//       console.log("form gửi category lên: ", this.categoryForm.value)
//       await this.categoryService.createCategory(this.categoryForm.value);

//       setTimeout(() => {
//         this.loading = false;
//         this.resetForm();
//         this.onClose();
//       }, 500);
//     } catch (error) {
//       console.log("error create category: ", error);
//       this.loading = false;
//     }
//   }

//   async getAllCategoryTopLevel() {
//     try {
//       const action$ = this.categoryService.getAllCategoryTopLevel();
//       const action = await firstValueFrom(action$);
//       this.store.dispatch(action);
//     } catch (error) {
//       console.log("error get all category top level!", error);
//       this.store.dispatch(getAllCategoryTopLevelFailure({ error }));
//     }
//   }

//   async getAllCategoryByParent(parentCategoryId: any) {
//     try {
//       const action$ = this.categoryService.getAllCategoryByParent(parentCategoryId);
//       const action = await firstValueFrom(action$);
//       this.store.dispatch(action);
//     } catch (error) {
//       console.log("error get all category by parent!", error);
//       this.store.dispatch(getAllCategoryByParentFailure({ error }));
//     }
//   }

// }

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../ngrx/Category/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { getAllCategoryByLevel, getAllCategoryByLevelFailure, getAllCategoryByParent, getAllCategoryByParentFailure } from '../ngrx/Category/category.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CategoryComponent implements OnInit {

  show: Boolean = false;

  showSelect: Boolean = false;

  loading: Boolean = false;

  categories$: Observable<any[]>

  childCategories$: Observable<any[]>;

  child2Categories$: Observable<any[]>;

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,  private fb: FormBuilder, private store: Store<AppState>) {

    this.categories$ = this.store.select(state => state.category.categorys);
    this.childCategories$ = this.store.select(state => state.category.childCategorys);
    this.child2Categories$ = this.store.select(state => state.category.child2Categorys);
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      categoryId1: [null],
      categoryId2: [null],
      categoryId3: [null],
      parentCategoryId: [null]
    });
  }

  ngOnInit() {
    this.store.dispatch(getAllCategoryByLevel());
    this.getAllCategoryByLevel(1);
    this.getAllCategoryByLevel(2);
    this.getAllCategoryByLevel(3);
  }

  onOpen() {
    this.show = true;
    this.categoryForm.patchValue({ categoryId1: null, categoryId2: null, categoryId3: null });
  }

  onClose() {
    this.show = false;
  }

  onSelectChange(event: Event, controlName: string) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (controlName === 'categoryId1') {
      this.categoryForm.patchValue({ categoryId2: null, categoryId3: null });
      this.showSelect = selectedValue !== "";
      this.getAllCategoryByParent(selectedValue);
    } else if (controlName === 'categoryId2') {
      this.categoryForm.patchValue({ categoryId3: null });
      this.getAllCategoryByParent(selectedValue);
    }
    this.categoryForm.patchValue({ parentCategoryId: selectedValue || this.categoryForm.value.categoryId1 });

    // Tự động điều hướng con trỏ sang thẻ `select` tiếp theo
    setTimeout(() => {
      if (controlName === 'categoryId1' && selectedValue) {
        document.getElementById('categoryId2')?.focus();
      } else if (controlName === 'categoryId2' && selectedValue) {
        document.getElementById('categoryId3')?.focus();
      }
    }, 0);
  }

  preventInteraction(event: Event, disabled: boolean) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  resetForm() {
    this.categoryForm.reset({
      name: '',
      categoryId1: null,
      categoryId2: null,
      categoryId3: null,
      parentCategoryId: null
    });
    this.showSelect = false;
  }

  async createCategory() {
    try {
      this.loading = true;
      console.log("form gửi category lên: ", this.categoryForm.value)
      await this.categoryService.createCategory(this.categoryForm.value);

      setTimeout(() => {
        this.loading = false;
        this.resetForm();
        this.onClose();
      }, 500);
    } catch (error) {
      console.log("error create category: ", error);
      this.loading = false;
    }
  }

  async getAllCategoryByLevel(level: number) {
    try {
      const action$ = this.categoryService.getAllCategoryByLevel(level);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);

    } catch (error) {
      console.log("error get all category top level!", error);
      this.store.dispatch(getAllCategoryByLevelFailure({ error }));
    }
  }

  async getAllCategoryByParent(parentCategoryId: any) {
    try {
      const action$ = this.categoryService.getAllCategoryByParent(parentCategoryId);
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);
    } catch (error) {
      console.log("error get all category by parent!", error);
      this.store.dispatch(getAllCategoryByParentFailure({ error }));
    }
  }

  onOpenUpdate(){
    
  }
}
