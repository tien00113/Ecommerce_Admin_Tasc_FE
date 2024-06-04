import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../ngrx/User/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css'],
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent]
})
export class AuthenComponent implements OnInit {

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    

  }

  isLogin = true;

  changeTemplate =  () => {
    this.isLogin = false
  }

}
