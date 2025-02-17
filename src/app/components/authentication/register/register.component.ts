import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { UserRegisterModel } from '../../../models/users/user-register-model';
import { CountryService } from '../../../core/services/country.service';
import { CountryDDMModel } from '../../../models/countries/country-ddm-model';
import { RegisterAddressesComponent } from "./register-addresses/register-addresses.component";
import { RegisterPhoneNumbersComponent } from "./register-phone-numbers/register-phone-numbers.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { RegisterEmailsComponent } from "./register-emails/register-emails.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RegisterAddressesComponent, RegisterPhoneNumbersComponent, RegisterUserComponent, RegisterEmailsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  allUserNames: string[] = [];
  allCountries: CountryDDMModel[] = [];
  registerModel: UserRegisterModel = {
    userName: '',
    firstName: '',
    middleName: undefined,
    lastName: '',
    password: '',
    customer: {
      addresses: [{
        addressLineOne: '',
        addressLineTwo: undefined,
        city: '',
        postCode: '',
        isMain: true,
        countryId: 1
      }],
      phoneNumbers: [{
        number: '9696994',
        isMain: true,
        countryId: 1
      }],
      emails: [{
        address: 'random@email.com',
        isMain: true
      }]
    }
  };
  page = 0;
  pages = [0, 1, 2, 3];

  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly countryService: CountryService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsernames().subscribe(res => {
      this.allUserNames = res;
    });

    this.countryService.getAllCountriesForDropdown().subscribe(res => {
      this.allCountries = res;
    });
  }

  onSubmit() {

    this.authService.register(this.registerModel).subscribe(res => {
      if (res && res.id && res.userName) {
        // Redirect only if id and username are present
        this.router.navigate(['/home']);
      }
    });
  }

  previousPageBtnClick() {
    this.page--;
  }
  nextPageBtnClick() {
    this.page++;
  }

  logBtnClick(form: NgForm) {
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name)
      }
    }
    // console.log(form.controls);
    console.log(this.registerModel);
  }


}
