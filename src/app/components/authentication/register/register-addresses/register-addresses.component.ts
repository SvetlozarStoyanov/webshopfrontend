import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';

@Component({
  selector: 'app-register-addresses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-addresses.component.html',
  styleUrl: './register-addresses.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterAddressesComponent {
  lastAddressIsValid: boolean = true;
  canRemoveAddresses: boolean = false;
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
    this,this.canRemoveAddresses = true;
    this.addAddressEvent.emit();
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
}
