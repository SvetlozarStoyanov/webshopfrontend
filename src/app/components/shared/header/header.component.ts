import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  profilePicture: string | null = null;
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {

  }
  ngOnInit(): void {
    this.authService.authStatus$.subscribe(res => {
      this.isLoggedIn = res;
    });

    this.userService.getProfilePicture().subscribe(res => {
      console.log(res);
      const blob = new Blob([res], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(res);
      this.profilePicture = imageUrl;
    })
  }

  logout() {
    this.authService.logout().subscribe(res => {
      window.location.reload();
    });
  }
}
