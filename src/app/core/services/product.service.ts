import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductListModel } from '../../models/products/product-list-model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.apiUrl
  constructor(private readonly httpClient: HttpClient) {

  }

  getAllProducts() {
    return this.httpClient.get<ProductListModel[]>(`${this.apiUrl}/products/all`);
  }
}
