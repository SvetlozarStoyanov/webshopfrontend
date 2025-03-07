import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { AddressDetailsModel } from '../../models/addresses/address-details-model';
import { AddressEditModel } from '../../models/addresses/address-edit-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {

  }

  getCustomerAddresses() {
    return this.httpClient.get<AddressDetailsModel[]>(`${this.apiUrl}/addresses/get-customer-addresses`);
  }

  updateAddresses(addressEditModels: AddressEditModel[]) {
    return this.httpClient.put(`${this.apiUrl}/customers/edit-addresses`, addressEditModels)
  }
}
