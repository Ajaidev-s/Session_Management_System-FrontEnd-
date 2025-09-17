import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import * as jwt_decode from 'jwt-decode';
// import { IUser } from '../Interfaces/Iuser';

interface LoginRequest {
  email: string;
  password: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}
interface AuthResponse {
  token: string;
  expiration: string;
  userName: string;
  role: string;
}

interface CustomJwtPayload {
  exp: number;
  iss: string;
  aud: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Auth`; // 👈 now from environment

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/register`, data);
  }
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded = jwt_decode.jwtDecode<CustomJwtPayload>(token);
    console.log(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }
}
