import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css'],
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent]
})
export class AuthenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLogin = true;

  changeTemplate =  () => {
    this.isLogin = false
  }

}
