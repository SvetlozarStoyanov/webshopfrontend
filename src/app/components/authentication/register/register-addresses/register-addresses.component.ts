import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { AddressCreateModel } from '../../../../models/addresses/address-create-model';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register-addresses',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './register-addresses.component.html',
  styleUrl: './register-addresses.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterAddressesComponent {
  lastAddressIsValid: boolean = true;
  @Input('addresses') addresses!: AddressCreateModel[];
  @Input('countries') countries!: CountryDDMModel[];

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  addNewAddress() {
    const lastAddress = this.addresses[this.addresses.length - 1];
    if (lastAddress.addressLineOne.length < 1 || lastAddress.city.length < 1 || lastAddress.postCode.length < 1) {
      this.lastAddressIsValid = false;
      return;
    }
    this.lastAddressIsValid = true;
    // this.addresses.push({
    //   addressLineOne: 'Test address',
    //   addressLineTwo: '',
    //   city: '',
    //   postCode: '',
    //   isMain: false,
    //   countryId: 1,
    // });

    // Create a completely new object
    const newAddress: AddressCreateModel = {
      addressLineOne: ``,
      addressLineTwo: '',
      city: '',
      postCode: '',
      isMain: false,
      countryId: 1,
    };

    // Use the spread operator to create a new array reference
    this.addresses = [...this.addresses, { ...newAddress }];
    // this.changeDetector.detectChanges();
  }

  trackByFn(index: number, address: AddressCreateModel): any {
    console.log(index, address);
    return address;
  }

  generateUniqueId(): number {
    return new Date().getTime() + Math.floor(Math.random() * 1000);
  }
}
