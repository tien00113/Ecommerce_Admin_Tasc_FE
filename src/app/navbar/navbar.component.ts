import { Component, OnInit } from '@angular/core';
import { UserService } from '../ngrx/User/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoryService } from '../ngrx/Category/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
  standalone: true,
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  userProfile$: Observable<any>;

  userProfile: any;

  constructor(private store: Store<AppState>
  ) {
    this.userProfile$ = this.store.select(state => state.user.userProfile);

  }


  ngOnInit() {
    // this.store.dispatch(getUserProfile());
    this.userProfile$.subscribe(
      (userProfile) => {
        this.userProfile = userProfile;
      }
    )
  }

}
