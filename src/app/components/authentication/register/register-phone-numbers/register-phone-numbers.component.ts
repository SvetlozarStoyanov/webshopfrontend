import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';
import { AbstractControl, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-phone-numbers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-phone-numbers.component.html',
  styleUrl: './register-phone-numbers.component.css'
})
export class RegisterPhoneNumbersComponent {

  phoneNumbersAreValid: boolean = true;
  canRemovePhoneNumbers: boolean = false;
  @Input('phoneNumbers') phoneNumbers!: FormArray;
  @Input('countries') countries: CountryDDMModel[] = [];
  @Output() addNewPhoneNumberEvent = new EventEmitter<void>();

  addNewPhoneNumber() {
    if (this.phoneNumbers.invalid) {
      this.phoneNumbersAreValid = false;
      return;
    }
    console.log('Added phone');
    this.phoneNumbersAreValid = true;
    this.canRemovePhoneNumbers = true;
    this.addNewPhoneNumberEvent.emit();
  }

  getPhoneNumberFormGroup(index: number) {
    return this.phoneNumbers.at(index) as FormGroup;
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
    console.log('Removed phone');
    const currIsMain = this.phoneNumbers.controls[index].get('isMain')?.value;
    this.phoneNumbers.removeAt(index);
    if (this.phoneNumbers.length === 1) {
      this.canRemovePhoneNumbers = false;
    }
    if (currIsMain) {
      this.selectMain(this.phoneNumbers.length - 1);
    }
  }

}
