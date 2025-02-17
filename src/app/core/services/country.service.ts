import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CountryDDMModel } from '../../models/countries/country-ddm-model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl: string = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {

  }

  getAllCountriesForDropdown(){
    return this.httpClient.get<CountryDDMModel[]>(`${this.apiUrl}/countries/all-ddm`)
  }
}
