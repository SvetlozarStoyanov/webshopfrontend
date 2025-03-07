import { Component, OnInit } from '@angular/core';
import { AddressEditModel } from '../../../models/addresses/address-edit-model';
import { AddressService } from '../../../core/services/address.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryDDMModel } from '../../../models/countries/country-ddm-model';
import { CountryService } from '../../../core/services/country.service';
import { UniqueInputDirective } from '../../../core/directives/unique-input.directive';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, UniqueInputDirective, RouterLink],
  templateUrl: './update-addresses.component.html',
  styleUrl: './update-addresses.component.css'
})
export class UpdateAddressesComponent implements OnInit {

  lastAddressIsValid: boolean = true;
  canRemoveAddresses: boolean = false;
  editAddressesForm!: FormGroup;
  initialAddresses: AddressEditModel[] = [];
  countries: CountryDDMModel[] = []
  constructor(private readonly addressService: AddressService,
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {

  }

  ngOnInit(): void {
    this.countryService.getAllCountriesForDropdown().subscribe(res => {
      this.countries = res;
    })

    this.editAddressesForm = this.fb.group({
      addresses: this.fb.array([])
    })

    this.addressService.getCustomerAddresses().subscribe(res => {
      this.initialAddresses = res;
      this.addInitialAddressesToForm();
    })
  }

  addInitialAddressesToForm() {
    for (const address of this.initialAddresses) {
      this.addresses.push(this.fb.group({
        id: address.id,
        addressLineOne: [address.addressLineOne, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9., ]+$')]],
        addressLineTwo: [address.addressLineTwo, [Validators.minLength(3), Validators.pattern('^[A-Za-z0-9., ]+$')]],
        city: [address.city, [Validators.required, Validators.minLength(1), Validators.pattern('^[A-Za-z ]+$')]],
        postCode: [address.postCode, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z0-9]+$')]],
        isMain: [address.isMain],
        countryId: [address.countryId, Validators.required]
      }));
    }

    this.lastAddressIsValid = true;
    this.canRemoveAddresses = true;
  }

  get addresses(): FormArray {
    return this.editAddressesForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    if (this.editAddressesForm.invalid) {
      this.lastAddressIsValid = false;
      return;
    }

    this.addresses.push(this.fb.group({
      id: null,
      addressLineOne: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9., ]+$')]],
      addressLineTwo: ['', [Validators.minLength(3), Validators.pattern('^[A-Za-z0-9., ]+$')]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[A-Za-z ]+$')]],
      postCode: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z0-9]+$')]],
      isMain: [false],
      countryId: [1, Validators.required]
    }));
    this.lastAddressIsValid = true;
    this.canRemoveAddresses = true;
  }

  selectMain(index: number) {
    this.addresses.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    });
  }

  remove(index: number) {
    if (this.addresses.length < 2) {
      return;
    }
    const currIsMain = this.addresses.controls[index].get('isMain')?.value;
    this.addresses.removeAt(index);
    if (this.addresses.length === 1) {
      this.canRemoveAddresses = false;
    }
    if (currIsMain) {
      this.selectMain(this.addresses.length - 1);
    }
  }

  getAddressFormGroup(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }

  getAddressLines(): string[] {
    return this.addresses.controls.map(x => x.get('addressLineOne')?.value);
  }

  onSubmit() {
    const formData: AddressEditModel[] = this.editAddressesForm.get('addresses')!.value;
    this.addressService.updateAddresses(formData).subscribe(res => {
      this.router.navigate(['/profile']);
    });
  }

}
