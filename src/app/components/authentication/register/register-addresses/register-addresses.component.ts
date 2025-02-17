import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { AddressCreateModel } from '../../../../models/addresses/address-create-model';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';

@Component({
  selector: 'app-register-addresses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-addresses.component.html',
  styleUrl: './register-addresses.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterAddressesComponent {
  lastAddressIsValid: boolean = true;
  @Input('addresses') addresses!: AddressCreateModel[];
  @Input('countries') countries!: CountryDDMModel[];

  addNewAddress() {
    const lastAddress = this.addresses[this.addresses.length - 1];
    if (lastAddress.addressLineOne.length < 1 || lastAddress.city.length < 1 || lastAddress.postCode.length < 1) {
      this.lastAddressIsValid = false;
      return;
    }
    this.lastAddressIsValid = true;
    this.addresses = [...this.addresses, {
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      postCode: '',
      isMain: false,
      countryId: 1,
    }];
  }

  trackByAddress(index: number, address: any): number {
    return this.addresses.indexOf(address);
  }



}
