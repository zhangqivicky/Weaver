import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {EventService} from '../../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from '../../../models/event.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-event-profile',
  templateUrl: './event-profile.component.html',
  styleUrls: ['./event-profile.component.css']
})
export class EventProfileComponent implements OnInit {
  eventId: string
  event: Event;
  name: string;
  location: string;
  date: Date;
  joinMark: boolean;

  constructor(private userService: UserService,
              private eventService: EventService,
              private sharedService: SharedService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.eventId = params['eid'];
      this.eventService.findEventById(this.eventId).subscribe(
        res => {
          this.event = res;
          this.name = this.event['name'];
          this.location = this.event['location'];
          this.date = this.event['date'];
        });
  });
  }
  logout() {
      this.userService.logout().subscribe(
        res => {
          this.router.navigate(['/login']);
        });
  }
  toChat() {
    this.router.navigate(['/event/' + this.eventId + '/chat']);
  }
  cancleEvent() {
  }
  joinEvent() {
  }

}
