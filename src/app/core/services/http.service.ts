import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUrl } from '../enums/http-url';
import { Observable, Observer, ObservedValueOf } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${HttpUrl.Token}?grant_type=password&username=${username}&password=${password}`, null);
  }

  refresh(): Observable<any> {
    return this.http.post(`${HttpUrl.Token}?grant_type=refresh_token&refresh_token=${this.localStorageService.get('refresh_token')}`, null);
  }

  signUpUser(body: any): Observable<any> {
    return this.http.post(HttpUrl.Users, body);
  }

  signUpEmployee(body: any): Observable<any> {
    return this.http.post(HttpUrl.Employees, body);
  }

  getEmployees(): Observable<any> {
    return this.http.get(HttpUrl.Employees);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${id}`);
  }

  getProfileInfo(id: string, profileType: string): Observable<any> {
    if (profileType === 'employee') {
      return this.getEmployeeProfileInfo(id);
    } else {
      return this.getUserProfileInfo(id);
    }
  }

  getEmployeeProfileInfo(id: string): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${id}`);
  }

  getUserProfileInfo(id: string): Observable<any> {
    return this.http.get(`${HttpUrl.Users}/${id}`);
  }

  getCatInfo(id: string): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${id}/car`);
  }

  updateProfileInfo(id: string, profileInfoData: any, profileType: string, requestType: string): Observable<any> {
    if (profileType === 'employee') {
      return this.updateEmployeeProfileInfo(id, profileInfoData, requestType);
    } else {
      return this.updateUserProfileInfo(id, profileInfoData, requestType);
    }
  }

  updateEmployeeProfileInfo(id: string, profileInfoData: any , requestType: string): Observable<any> {
    return this.http.patch(`${HttpUrl.Employees}/${id}?type=${requestType}`, profileInfoData);
  }

  updateUserProfileInfo(id: string, profileInfoData: any , requestType: string): Observable<any> {
    return this.http.patch(`${HttpUrl.Users}/${id}?type=${requestType}`, profileInfoData);
  }

  updateEmployeeCarInfo(id: string, data: Car): Observable<any> {
    return this.http.patch(`${HttpUrl.Employees}/${id}?type=car`, data);
  }
}
