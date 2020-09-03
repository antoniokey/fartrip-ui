import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUrl } from '../enums/http-url';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Car } from '../models/car';
import { Comment } from '../models/comment';

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

  signUpAccount(accountData: any): Observable<any> {
    if (accountData.role === 'USER') {
      return this.signUpUser(accountData);
    } else {
      return this.signUpEmployee(accountData);
    }
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

  createOrder(data: any): Observable<any> {
    return this.http.post(HttpUrl.Orders, data);
  }

  getOrders(id: string, profileType: string): Observable<any> {
    if (profileType === 'employee') {
      return this.getEmployeeOrders(id);
    } else {
      return this.getUserOrders(id);
    }
  }

  getOrder(orderId: string, accountId: string, profileType: string): Observable<any> {
    if (profileType === 'employee') {
      return this.getEmployeeOrder(orderId, accountId);
    } else {
      return this.getUserOrder(orderId, accountId);
    }
  }

  getEmployeeOrders(id: string): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${id}/orders`);
  }

  getUserOrders(id: string): Observable<any> {
    return this.http.get(`${HttpUrl.Users}/${id}/orders`);
  }

  getEmployeeOrder(orderId: string, accountId: string): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${accountId}/orders/${orderId}`);
  }

  getUserOrder(orderId: string, accountId: string): Observable<any> {
    return this.http.get(`${HttpUrl.Users}/${accountId}/orders/${orderId}`);
  }

  updateOrderStatus(orderStatusData: any): Observable<any> {
    return this.http.patch(`${HttpUrl.Orders}/${orderStatusData.id}/status`, orderStatusData);
  }

  getEmployeeComments(accountId: string): Observable<any> {
    return this.http.get(`${HttpUrl.Employees}/${accountId}/comments`);
  }

  createEmployeeComment(employeeAccountId: string, userAccountId: string, comment: Comment): Observable<any> {
    return this.http.post(`${HttpUrl.Employees}/${employeeAccountId}/comments`, { userAccountId, comment });
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${HttpUrl.Comments}/${id}`);
  }

  updateProfileInfo(id: string, profileInfoData: any, profileType: string, requestType: string): Observable<any> {
    if (profileType === 'employee') {
      return this.updateEmployeeProfileInfo(id, profileInfoData, requestType);
    } else {
      return this.updateUserProfileInfo(id, profileInfoData, requestType);
    }
  }

  updateProfileLogo(id: string, logoFormData: FormData): Observable<any> {
    return this.http.post(`${HttpUrl.Accounts}/${id}/logo`, logoFormData);
  }

  removeProfileLogo(id: string): Observable<any> {
    return this.http.delete(`${HttpUrl.Accounts}/${id}/logo`);
  }

  updateCarImage(id: string, logoFormData: FormData): Observable<any> {
    return this.http.post(`${HttpUrl.Employees}/${id}/car`, logoFormData);
  }

  removeCarImage(id: string): Observable<any> {
    return this.http.delete(`${HttpUrl.Employees}/${id}/car`);
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
