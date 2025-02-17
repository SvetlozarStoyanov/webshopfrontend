import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { UserLoginModel } from '../../models/users/user-login-model';
import { environment } from '../../../environment/environment';
import { UserRegisterModel } from '../../models/users/user-register-model';
import { UserLoginOutputModel } from '../../models/users/user-login-output-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  private authStatus$$ = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatus$$.asObservable();

  constructor(private httpClient: HttpClient) {
    this.syncAuthState();
  }

  getCurrentUser(): UserLoginModel | null {
    let userAsString = localStorage.getItem('user');
    if (!userAsString) {
      return null;
    }
    return JSON.parse(userAsString);
  }

  login(loginModel: UserLoginModel) {
    return this.httpClient.post<UserLoginOutputModel>(`${this.apiUrl}/auth/login`, loginModel).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.authStatus$$.next(true);
        return res;
      }),
      catchError(error => {

        return of(null);
      })
    );
  }

  register(registerModel: UserRegisterModel) {
    return this.httpClient.post<UserLoginOutputModel>(`${this.apiUrl}/auth/register`, registerModel).pipe(
      map(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.authStatus$$.next(true);
        return res;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  logout() {
    return this.httpClient.post(`${this.apiUrl}/auth/logout`, {}).pipe(
      map(res => {
        this.authStatus$$.next(false);
        localStorage.removeItem('user');
        return res;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  private syncAuthState() {
    this.authStatus$$.next(this.isAuthenticated());
  }
}
