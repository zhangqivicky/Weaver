import {User} from '../models/user.model.client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment.prod';
import {SharedService} from './shared.service.client';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),  withCredentials: true};
  constructor(private sharedService: SharedService, private router: Router, private http: HttpClient) {}
  register(email: String, password: String): Observable<User> {
    alert('register client 4');
    const url = this.baseUrl + '/api/register';
    const body = {
      email: email,
      password: password
    };
    console.log('register client 5' + JSON.stringify(body));
    return this.http.post<User>(url, body, this._options);
  }

  login(email: String, password: String): Observable<User> {
    const url = this.baseUrl + '/api/login';
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<User>(url, body, this._options);
  }
  logout(): Observable<any> {
    const url = this.baseUrl + '/api/logout';
    return this.http.post<any>(url, '', this._options);
  }

  loggedin(): Observable<any> {
    const url = this.baseUrl + '/api/loggedin';
    return this.http.post<any>(url, '', this._options).pipe(
      map(res => {
        if (res !== '0') {
          this.sharedService.user = res;
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }));
  }
  createUser(user: User): Observable<User> {
    const url = this.baseUrl + '/api/user';
    const body = {
      username: user['username'],
      password: user['password'],
      email: user['email'],
      firstName: user['firstName'],
      lastName: user['lastName']
    }
    return this.http.post<User>(url, JSON.stringify(body), this._options);
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
    const body = {
      username: user['username'],
      password: user['password'],
      firstName: user['firstName'],
      lastName: user['lastName'],
      imgsrc: user['imgsrc'],
    }
    return this.http.put<User>(url, body, this._options);
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
