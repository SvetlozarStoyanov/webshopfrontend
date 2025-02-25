import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressCreateModel } from '../../../../models/addresses/address-create-model';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';
import { NgFor } from '@angular/common';
import { UniqueInputDirective } from '../../../../core/directives/unique-input.directive';

@Component({
  selector: 'app-register-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, UniqueInputDirective],
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

    this.lastAddressIsValid = true;
    this.addAddressEvent.emit();
  }

  getAddressFormGroup(index: number): FormGroup {
    return this.addresses.at(index) as FormGroup;
  }

  getAddressLines(): string[] {
    return this.addresses.controls.map(x => x.get('addressLineOne')?.value);
  }
}
