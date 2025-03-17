import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { EmailDetailsModel } from '../../models/emails/email-details-model';
import { EmailEditModel } from '../../models/emails/email-edit-model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl: string = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {

  }

  getCustomerEmails() {
    return this.httpClient.get<EmailDetailsModel[]>(`${this.apiUrl}/emails/get-customer-emails`);
  }

  updateEmails(emailEditModels: EmailEditModel[]) {
    return this.httpClient.put(`${this.apiUrl}/customers/edit-emails`, emailEditModels);
  }
}
