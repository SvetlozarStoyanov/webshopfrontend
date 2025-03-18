import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryDDMModel } from '../../../models/countries/country-ddm-model';
import { PhoneNumberEditModel } from '../../../models/phoneNumbers/phoneNumber-edit-model';
import { CountryService } from '../../../core/services/country.service';
import { PhoneNumberService } from '../../../core/services/phone-number.service';
import { Router, RouterLink } from '@angular/router';
import { uniqueValidator } from '../../../core/validators/unique.validator';

@Component({
  selector: 'app-update-phone-numbers',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-phone-numbers.component.html',
  styleUrl: './update-phone-numbers.component.css'
})
export class UpdatePhoneNumbersComponent implements OnInit {

  lastPhoneNumberIsValid: boolean = true;
  canRemovePhoneNumber: boolean = false;
  editPhoneNumbersForm!: FormGroup;
  initialPhoneNumbers: PhoneNumberEditModel[] = [];
  countries: CountryDDMModel[] = [];

  constructor(private readonly phoneNumberService: PhoneNumberService,
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.countryService.getAllCountriesForDropdown().subscribe(res => {
      this.countries = res;
    })

    this.editPhoneNumbersForm = this.fb.group({
      phoneNumbers: this.fb.array([])
    });



    this.phoneNumberService.getCustomerPhoneNumbers().subscribe(res => {
      this.initialPhoneNumbers = res;
      this.addInitialPhoneNumbersToForm();
    });
  }

  addInitialPhoneNumbersToForm() {
    if (this.initialPhoneNumbers.length > 1) {
      this.canRemovePhoneNumber = true;
    }

    for (const phoneNumber of this.initialPhoneNumbers) {
      this.phoneNumbers.push(this.fb.group({
        id: phoneNumber.id,
        number: [phoneNumber.number, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), uniqueValidator('number')]],
        isMain: [phoneNumber.isMain],
        countryId: [phoneNumber.countryId, Validators.required]
      }));
    }
  }

  get phoneNumbers(): FormArray {
    return this.editPhoneNumbersForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(): void {
    if (this.editPhoneNumbersForm.invalid) {
      this.lastPhoneNumberIsValid = false;
      return;
    }

    this.phoneNumbers.push(this.fb.group({
      id: null,
      number: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), uniqueValidator('number')]],
      isMain: [false],
      countryId: [1, Validators.required]
    }));

    this.lastPhoneNumberIsValid = true;
    this.canRemovePhoneNumber = true;
    this.revalidateUniqueness();
  }

  revalidateUniqueness() {
    this.phoneNumbers.controls.forEach(group => group.get('number')?.updateValueAndValidity());
  }

  selectMain(index: number) {
    this.phoneNumbers.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    });
  }

  remove(index: number) {
    if (this.phoneNumbers.length < 2) {
      return;
    }
    const currIsMain = this.phoneNumbers.controls[index].get('isMain')?.value;
    this.phoneNumbers.removeAt(index);
    if (this.phoneNumbers.length === 1) {
      this.canRemovePhoneNumber = false;
    }
    if (currIsMain) {
      this.selectMain(this.phoneNumbers.length - 1);
    }
    this.revalidateUniqueness();
  }


  getPhoneNumberFormGroup(index: number): FormGroup {
    return this.phoneNumbers.at(index) as FormGroup;
  }

  getPhoneNumbers(): string[] {
    return this.phoneNumbers.controls.map(x => x.get('number')?.value);
  }


  onSubmit() {
    const formData: PhoneNumberEditModel[] = this.editPhoneNumbersForm.get('phoneNumbers')!.value;
    this.phoneNumberService.updateAddresses(formData).subscribe(res => {
      this.router.navigate(['/profile']);
    });
  }
}
