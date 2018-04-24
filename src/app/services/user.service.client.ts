import {User} from '../models/user.model.client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  createUser(user: User): Observable<User> {
    const url = this.baseUrl + '/api/user';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      username: user['username'],
      password: user['password'],
      email: user['email'],
      firstName: user['firstName'],
      lastName: user['lastName']
    }
    return this.http.post<User>(url, JSON.stringify(body), {headers});
  }

  findUserById(userId: String): Observable<User> {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get<User>(url);
  }

  findUserByEmail(email: string): Observable<User> {
    const url = this.baseUrl + '/api/user?email=' + email;
    return this.http.get<User>(url);
  }

  findUserByCredentials(email: String, password: String): Observable<User> {
    const url = this.baseUrl + '/api/user?email=' + email + '&password=' + password;
    return this.http.get<User>(url);
  }

  updateUser(userId: String, user: User): Observable<User> {
    const url = this.baseUrl + '/api/user/' + userId;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      username: user['username'],
      password: user['password'],
      firstName: user['firstName'],
      lastName: user['lastName'],
      imgsrc: user['imgsrc'],
    }
    return this.http.put<User>(url, JSON.stringify(body), {headers});
  }

  deleteUser(userId): Observable<User> {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete<User>(url);
  }

  postFile(userId: String, fileToUpload: File): Observable<boolean> {
    const url = this.baseUrl + '/api/user/' + userId + '/upload';
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const formData: FormData = new FormData();
    formData.append('photo', fileToUpload);
    return this.http
      .post(url, formData, { headers: {} })
      .map(() => { return true; });   // .catch((e) => this.handleError(e));
  }

}
