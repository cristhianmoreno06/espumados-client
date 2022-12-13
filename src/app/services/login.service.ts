import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlLogin: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.urlLogin = environment.ApiEndPoint + 'login';
  }

  public loginAttempt(data: any) {
    return this.httpClient.post<any>(this.urlLogin, data).pipe(tap(response => {
      localStorage.setItem('access_token', JSON.stringify(response.token));
      localStorage.setItem('role', JSON.stringify(response.role));
      return true;
    }));
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
