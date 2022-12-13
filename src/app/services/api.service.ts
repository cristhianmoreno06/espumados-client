import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  post(path: string, data?: any): any {
    return this.http
      .post<any>(`${environment.ApiEndPoint}${path}`, data)
      .pipe(map((data) => data));
  }

  get(path: string, data?: any): any {
    return this.http.get<any>(`${environment.ApiEndPoint}${path}`, data).pipe(map((data) => data));
  }

  delete(path: string): any {
    return this.http
      .delete<any>(`${environment.ApiEndPoint}${path}`)
      .pipe(map((data) => data));
  }

  put(path: string, data: any): any {
    return this.http
      .put<any>(`${environment.ApiEndPoint}${path}`, data)
      .pipe(map((data) => data));
  }
}
