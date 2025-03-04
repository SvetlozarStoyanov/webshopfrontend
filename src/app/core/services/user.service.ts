import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfileModel } from '../../models/users/user-profile-model';

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

  getProfilePicture() {
    return this.httpClient.get(`${this.apiUrl}/users/get-profile-picture`, { responseType: 'blob' });
  }

  updateProfilePicture(file: FormData) {
    return this.httpClient.post(`${this.apiUrl}/users/update-profile-picture`, file);
  }

  getProfileInfo(): Observable<UserProfileModel> {
    return this.httpClient.get<UserProfileModel>(`${this.apiUrl}/users/get-own-profile`);
  }
}
