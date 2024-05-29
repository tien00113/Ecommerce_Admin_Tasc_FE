import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../ngrx/User/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [],
  standalone: true,
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  userProfile: any;

  constructor(private userService: UserService, private store: Store<AppState>,
  ) { }


  ngOnInit() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.userService.getUserProfile();
    }

    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.userProfile = user.userProfile;
    });

  }

}
