import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthSerivce } from '../../ngrx/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: []
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private store: Store, private authService: AuthSerivce) { }

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required]
  })


  submitForm(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
      console.log("form value register: ", this.registerForm.value);
    }
  }

  ngOnInit() {
  }

}
