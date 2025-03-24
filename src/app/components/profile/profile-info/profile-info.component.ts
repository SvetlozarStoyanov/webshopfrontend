import { Component, OnInit } from '@angular/core';
import { UserDetailsModel } from '../../../models/users/user-profile-model';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerDetailsModel } from '../../../models/customers/customer-details-model';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements OnInit {
  customer: CustomerDetailsModel | undefined;
  profilePicture: string | null = null;
  constructor(private customerService: CustomerService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.customerService.getProfileInfo().subscribe(res => {
      this.customer = res;
    })
    this.userService.getProfilePicture().subscribe(res => {
      console.log(res);
      const blob = new Blob([res], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(res);
      this.profilePicture = imageUrl;
    })
  }

}
