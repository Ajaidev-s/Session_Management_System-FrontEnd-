import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
// import { IUser } from '../Interfaces/Iuser';

interface LoginRequest {
  email: string;
  password: string;
}
export interface IUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    roleId:number;
}
interface AuthResponse {
  token: string;
  expiration: string;
  userName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/Auth`;  // 👈 now from environment

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data : IUser) : Observable<IUser>{
    return this.http.post<IUser>(`${this.apiUrl}/register`,data)
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
}
