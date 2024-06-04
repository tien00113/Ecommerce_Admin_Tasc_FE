import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './ngrx/User/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './models/AppState';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthenComponent } from './authen/authen.component';
import { getUserProfile, getUserProfileFailure } from './ngrx/User/user.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule, CommonModule, AuthenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService],
})
export class AppComponent implements OnInit {
  title = 'Ecommerce_Admin_Tasc_FE';

  // auth$: Observable<any>;

  auth$: Observable<any>;

  auth: any

  constructor(@Inject(PLATFORM_ID) private platformId: any, private store: Store<AppState>, private userService: UserService) {
    this.auth = this.store.select(state => state.user.userProfile).subscribe(
      (auth) => {
        this.auth = auth
      }
    )
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(module => {
        const { initAccordions, initFlowbite } = module;
        initAccordions();
        initFlowbite();
      })
    }

    const token = localStorage.getItem("jwt");
    if (token) {
      this.store.dispatch(getUserProfile());
      console.log("tokeen là: ", token)
      this.getUserProfile();
    }
    console.log("user profile là ----: ", this.auth$);
  }

  async getUserProfile(){
    try {
      const action$ = this.userService.getUserProfile();
      const action = await firstValueFrom(action$);
      this.store.dispatch(action);
    } catch (error) {
      console.log("error get user profile!", error);
      this.store.dispatch(getUserProfileFailure({ error }));
    }
  }

  

}
