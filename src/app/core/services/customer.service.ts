import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { CustomerDetailsModel } from '../../models/customers/customer-details-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl: string = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) { 

  }

  getProfileInfo(): Observable<CustomerDetailsModel> {
    return this.httpClient.get<CustomerDetailsModel>(`${this.apiUrl}/customers/own-details`);
  }
}
