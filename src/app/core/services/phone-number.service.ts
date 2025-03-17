import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PhoneNumberEditModel } from '../../models/phoneNumbers/phoneNumber-edit-model';
import { Observable } from 'rxjs';
import { PhoneNumberDetailsModel } from '../../models/phoneNumbers/phoneNumber-details-model';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {
  apiUrl: string = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {

  }

  getCustomerPhoneNumbers() {
    return this.httpClient.get<PhoneNumberDetailsModel[]>(`${this.apiUrl}/phoneNumbers/get-customer-phone-numbers`)
  }

  updateAddresses(phoneNumberEditModels: PhoneNumberEditModel[]) {
    return this.httpClient.put(`${this.apiUrl}/customers/edit-phone-numbers`, phoneNumberEditModels);
  }
}
