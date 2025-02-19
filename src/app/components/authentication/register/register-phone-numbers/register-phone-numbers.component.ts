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
export class RegisterPhoneNumbersComponent implements OnInit, AfterViewInit, OnChanges {

  phoneNumbersAreValid: boolean = true;
  @Input('phoneNumbers') phoneNumbers!: FormArray;
  @Input('countries') countries: CountryDDMModel[] = [];
  @Output() addNewPhoneNumberEvent = new EventEmitter<void>();

  ngOnInit() {
    // this.phoneNumbers.controls[0].get('isMain')?.setValue(true);
  }

  ngAfterViewInit(): void {
    // console.log(this.phoneNumbers.controls[0].get('isMain'));
    // this.phoneNumbers.controls[0].get('isMain')?.setValue(true);
    // console.log(this.phoneNumbers.controls[0].get('isMain')?.value);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['phoneNumbers'] && this.phoneNumbers && this.phoneNumbers.length > 0) {
      this.phoneNumbers.controls[0].get('isMain')?.setValue(true);  // Set the default 'isMain' to true
    }
  }

  addNewPhoneNumber() {
    if (this.phoneNumbers.invalid) {
      this.phoneNumbersAreValid = false;
      return;
    }
    this.phoneNumbersAreValid = true;
    this.addNewPhoneNumberEvent.emit();
  }

  getPhoneNumberFormGroup(index: number) {
    return this.phoneNumbers.at(index) as FormGroup;
  }

  selectMain(index: number) {
    console.log('Change radio');
    this.phoneNumbers.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    });
  }

}
