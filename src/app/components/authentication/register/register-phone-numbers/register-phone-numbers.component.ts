import { Component, Input } from '@angular/core';
import { PhoneNumberCreateModel } from '../../../../models/phoneNumbers/phoneNumber-create-model';
import { CountryDDMModel } from '../../../../models/countries/country-ddm-model';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-phone-numbers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-phone-numbers.component.html',
  styleUrl: './register-phone-numbers.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegisterPhoneNumbersComponent {
  @Input('phoneNumbers') phoneNumbers: PhoneNumberCreateModel[] = [];
  @Input('countries') countries: CountryDDMModel[] = [];

}
