import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../../models/users/user-profile-model';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements OnInit {
  user: UserProfileModel | undefined;
  profilePicture: string | null = null;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getProfileInfo().subscribe(res => {
      this.user = res;
    })
    this.userService.getProfilePicture().subscribe(res => {
      console.log(res);
      const blob = new Blob([res], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(res);
      this.profilePicture = imageUrl;
    })
  }

}
