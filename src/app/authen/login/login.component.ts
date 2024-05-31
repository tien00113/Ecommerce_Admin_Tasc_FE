import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthSerivce } from '../../ngrx/Auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private store: Store, private authService: AuthSerivce) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  submitForm(): void {

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
      console.log("form value login: ", this.loginForm.value);
    }
  }

  ngOnInit() {
  }

  @Input() changeTemplate: any;

}
