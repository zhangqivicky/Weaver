import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../services/event.service.client';
import {User} from '../../../models/user.model.client';
import {Event} from '../../../models/event.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.css']
})
export class HomeEventComponent implements OnInit {
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
      this.eventService.findPostEventsByUser(this.userId).subscribe(res => {
        // console.log('postevents :' + JSON.stringify(res));
        this.postevents = res;
      }, err => {
        alert('Error!');
      });
      this.eventService.findAllEvents().subscribe(res => {
        // console.log('events :' + JSON.stringify(res));
        this.events = res;
      }, err => {
        alert('Error!');
      });
    });
  }

  toEventDetail(eid: string) {
    this.router.navigate(['/event/' + eid]);
  }

  toHomePage(){
    this.router.navigate(['']);
  }

}
