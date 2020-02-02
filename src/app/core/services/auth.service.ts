import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:5000/auth/';
const optionsObj = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: { email: string, password: string }) {
    return this.http.post<{message: string, user: { username: string; roles: string[]; } }>
    (BASE_URL + 'login', body, optionsObj);
  }

  register(body: { email: string, username: string, password: string }) {
    return this.http.post<{message}>(BASE_URL + 'signup', body, optionsObj);
  }

  logout(body: null = null) {
    return this.http.post<{message}>(BASE_URL + 'logout', body, optionsObj);
  }
  check(body: null = null) {
    return this.http.post<{ username: string, isAdmin: boolean }>(BASE_URL + 'auth-check', body, optionsObj);
  }
}
