import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../../services/event.service.client';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';
import {Event} from '../../../../models/event.model.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit {
  userId: string;
  event: Event;
  eventId: string;
  attendees: string;
  user: User;
  arrattendees: string[];

  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
      this.eventService.findEventById(this.eventId).subscribe(res => {
        this.event = res;
        this.arrattendees = this.event.attendees.split(',');
        console.log(this.arrattendees);
      }, err => {
        alert('Error!'); });
    });
  }
  logout() {
    this.userService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      });
  }

}
