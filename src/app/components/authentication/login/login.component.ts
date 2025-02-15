import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserLoginModel } from '../../../models/users/user-login-model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFailed: boolean = false;
  loginModel: UserLoginModel = {
    userName: '',
    password: '',
  };

  constructor(private readonly authenticationService: AuthService,
    private readonly router: Router) {

  }

  onSubmit() {
    this.authenticationService.login(this.loginModel).subscribe(res => {
      console.log(res);
      if (res && res.id && res.userName) {
        // Redirect only if id and username are present
        this.router.navigate(['/home']);
      } else {
        console.log('login failed!')
        this.loginFailed = true;
      }
    })
  }

}
