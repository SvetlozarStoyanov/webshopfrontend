import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule, RouterLink, RegisterAddressesComponent, RegisterPhoneNumbersComponent, RegisterUserComponent, RegisterEmailsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userService.getAllUsernames().subscribe(res => {
      this.allUserNames = res;
    });

    this.countryService.getAllCountriesForDropdown().subscribe(res => {
      this.allCountries = res;
    });

    this.registerForm = this.fb.group({

      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      customer: this.fb.group({
        addresses: this.fb.array([]),
        phoneNumbers: this.fb.array([]),
        emails: this.fb.array([])
      })
    }
    );

    this.addDefaultValues();
  }

  get addresses(): FormArray {
    return this.registerForm.get('customer.addresses') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.registerForm.get('customer.phoneNumbers') as FormArray;
  }

  get emails(): FormArray {
    return this.registerForm.get('customer.emails') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.fb.group({
      addressLineOne: ['Bulgaria', Validators.required],
      addressLineTwo: [''],
      city: ['Varna', Validators.required],
      postCode: ['9010', Validators.required],
      isMain: [true],
      countryId: [1, Validators.required]
    }));
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.fb.group({
      number: ['965656232', Validators.required],
      isMain: [true],
      countryId: [1, Validators.required]
    }));
  }

  addEmail(): void {
    this.emails.push(this.fb.group({
      address: ['test@mail.cmo', [Validators.required, Validators.email]],
      isMain: [true]
    }));
  }

  private addDefaultValues(): void {
    this.addAddress();
    this.addPhoneNumber();
    this.addEmail();
  }

  onSubmit() {
    const formData: UserRegisterModel = this.registerForm.value;
    console.log(formData);
    this.authService.register(formData).subscribe(res => {
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

  logBtnClick() {

    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name)
      }
    }
    // console.log(form.controls);
    console.log(this.registerForm);
  }


}
