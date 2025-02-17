import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {

  }

  getAllUsernames(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/users/all-usernames`);
  }
}
