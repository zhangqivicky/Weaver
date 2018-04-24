import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../services/event.service.client';
import {User} from '../../../models/user.model.client';
import {Event} from '../../../models/event.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  userId: string;
  eventId: string;
  event: Event;
  postevents: Event[];
  savedevents: Event[];
  goingevents: Event[];
  events: Event[];
  user: User;

  constructor(private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
      this.eventService.findGoingEventsByUser(this.userId).subscribe(res => {
        this.goingevents = res;
      }, err => {
        alert('Error!'); });
      this.eventService.findPostEventsByUser(this.userId).subscribe(res => {
        // console.log('postevents :' + JSON.stringify(res));
        this.postevents = res;
      }, err => {
        alert('Error!'); });
      this.eventService.findSavedEventsByUser(this.userId).subscribe(res => {
        this.savedevents = res;
      }, err => {
        alert('Error!');
      });
      this.eventService.findAllEvents().subscribe(res => {
        // console.log('events :' + JSON.stringify(res));
        this.events = res;
      }, err => {
        alert('Error!');
      });
    }); }
  toNewEvent() {
    this.router.navigate(['/user/' + this.userId + '/event/new']);
  }
  toAttendees(eid) {
    this.router.navigate(['/user/' + this.userId + '/event/' + eid + '/attendee']);
  }
  toProfile() {
    this.router.navigate(['/user/' + this.userId]);
  }

  toEventEdit(eid: string) {
    this.router.navigate(['/user/' + this.userId + '/event/' + eid]);
  }

  toDelete() {
    this.eventService.deleteEvent(this.eventId).subscribe((event: any) => {
      this.event = event;
      this.router.navigate(['/user/' + this.userId + '/event/']);
    });
  }
}
