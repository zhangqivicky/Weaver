import {Event} from '../models/event.model.client';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}
  createEvent(userId, event): Observable<Event> {
    const url = 'http://localhost:3000/api/user/' + userId + '/event';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      name: event['name'],
      date: event['date'],
      location: event['location'],
      description: event['description'],
      creator: event['creator'],
      attendees: event['attendees'],
    };
    return this.http.post<Event>(url, JSON.stringify(body), {headers});
  }
  findPostEventsByUser(userId): Observable<Event[]> {
    const url = 'http://localhost:3000/api/user/' + userId + '/postevent';
    return this.http.get<Event[]>(url);
  }
  findPostEventById(eventId: string): Observable<Event> {
    const url = 'http://localhost:3000/api/event/' + eventId;
    return this.http.get<Event>(url);
  }
  findSavedEventsByUser(userId: string): Observable<Event[]> {
    const url = 'http://localhost:3000/api/user/' + userId + '/savedevent';
    return this.http.get<Event[]>(url);
  }
  findGoingEventsByUser(userId: string): Observable<Event[]> {
    const url = 'http://localhost:3000/api/user/' + userId + '/goingevent';
    return this.http.get<Event[]>(url);
  }
  updateEvent(eventId, event): Observable<Event> {
    const url = 'http://localhost:3000/api/event/' + eventId;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      name: event['name'],
      date: event['date'],
      location: event['location'],
      description: event['description'],
      creator: event['creator'],
      attendees: event['attendees'],
    };
    return this.http.put<Event>(url, JSON.stringify(body), {headers});
  }

  findEventById(eventId: String): Observable<Event> {
    const url = 'http://localhost:3000/api/event/' + eventId;
    return this.http.get<Event>(url);
  }

  deleteEvent(eventId): Observable<Event> {
    const url = 'http://localhost:3000/api/event/' + eventId;
    return this.http.delete<Event>(url);
  }
  findAllEvents(): Observable<Event[]> {
    const url = 'http://localhost:3000/api/event';
    return this.http.get<Event[]>(url);
  }
}
