import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './ngrx/User/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Ecommerce_Admin_Tasc_FE';

  constructor(@Inject(PLATFORM_ID) private platformId: any){}

  ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        import('flowbite').then(module => {
          const { initAccordions, initFlowbite } = module;
          initAccordions();
          initFlowbite();
        })
      }


      
  }

}
