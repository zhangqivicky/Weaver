import {Event} from '../models/event.model.client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class EventService {
  baseUrl = environment.baseUrl;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })};
  constructor(private http: HttpClient) {}
  createEvent(userId, event): Observable<Event> {
    const url = this.baseUrl + '/api/user/' + userId + '/event';
    const body = {
      name: event['name'],
      date: event['date'],
      location: event['location'],
      description: event['description']
    };
    return this.http.post<Event>(url, JSON.stringify(body), this._options);
  }
  findPostEventsByUser(userId): Observable<Event[]> {
    const url = this.baseUrl + '/api/user/' + userId + '/postevent';
    return this.http.get<Event[]>(url);
  }
  findSavedEventsByUser(userId: string): Observable<Event[]> {
    const url = this.baseUrl + '/api/user/' + userId + '/savedevent';
    return this.http.get<Event[]>(url);
  }
  findPostEventById(eventId: string): Observable<Event> {
    const url = this.baseUrl + '/api/event/' + eventId;
    return this.http.get<Event>(url);
  }
  findGoingEventsByUser(userId: string): Observable<Event[]> {
    const url = this.baseUrl + '/api/user/' + userId + '/goingevent';
    return this.http.get<Event[]>(url);
  }
  updateEvent(eventId, event): Observable<Event> {
    const url = this.baseUrl + '/api/event/' + eventId;
    const body = {
      name: event['name'],
      date: event['date'],
      location: event['location'],
      description: event['description'],
    };
    return this.http.put<Event>(url, JSON.stringify(body), this._options);
  }

  deleteEvent(eventId): Observable<Event> {
    const url = this.baseUrl + '/api/event/' + eventId;
    return this.http.delete<Event>(url);
  }
  findAllEvents(): Observable<Event[]> {
    const url = this.baseUrl + '/api/event';
    return this.http.get<Event[]>(url);
  }
  findEventById(eventId: string): Observable<Event> {
    const url = this.baseUrl + '/api/event/' + eventId;
    return this.http.get<Event>(url);
  }
}
