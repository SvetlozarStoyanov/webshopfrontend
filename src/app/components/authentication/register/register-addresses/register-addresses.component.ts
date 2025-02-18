import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressCreateModel } from '../../../../models/addresses/address-create-model';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './register-addresses.component.html',
  styleUrl: './register-addresses.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterAddressesComponent {
  lastAddressIsValid: boolean = true;
  @Input('addresses') addresses!: FormArray;
  @Input('countries') countries!: CountryDDMModel[];
  @Output() addAddressEvent = new EventEmitter<void>();
  constructor(private fb: FormBuilder) {

  }

  addNewAddress() {
    if (this.addresses.invalid) {
      this.lastAddressIsValid = false;
      return;
    }
    // const lastAddress = this.addresses[this.addresses.length - 1];
    // if (lastAddress.addressLineOne.length < 1 || lastAddress.city.length < 1 || lastAddress.postCode.length < 1) {
    //   this.lastAddressIsValid = false;
    //   return;
    // }
    this.lastAddressIsValid = true;
    this.addAddressEvent.emit();
    // this.addresses.push({
    //   addressLineOne: 'Test address',
    //   addressLineTwo: '',
    //   city: '',
    //   postCode: '',
    //   isMain: false,
    //   countryId: 1,
    // });

    // Create a completely new object
    const newAddress = {
      addressLineOne: ``,
      addressLineTwo: '',
      city: '',
      postCode: '',
      isMain: false,
      countryId: 1,
    };

    // Use the spread operator to create a new array reference
    // this.addresses = [...this.addresses, { ...newAddress }];
  }

  trackByFn(index: number, address: AddressCreateModel): any {
    console.log(index, address);
    return address;
  }

  getAddressFormGroup(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }
}
