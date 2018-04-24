import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';
import {EventService} from '../../../../services/event.service.client';
import {Event} from '../../../../models/event.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  userId: string;
  eventId: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  going: boolean;
  saved: boolean;
  event: Event;
  postevent: any;

  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
    });
    this.eventService.findPostEventById(this.eventId).subscribe((event: any ) =>{
      this.postevent = event;
      this.name = this.postevent['name'];
      this.date = this.postevent['date'];
      this.location = this.postevent['location'];
      this.description = this.postevent['description'];
      this.going = this.postevent['going'];
      this.saved = this.postevent['saved'];
    });
  }

  toDelete() {
    this.eventService.deleteEvent(this.eventId).subscribe((event: any) => {
      this.event = event;
      this.router.navigate(['/user/' + this.userId + '/event/']);
    });
  }

  toUpdate() {
    this.postevent = {name: this.name, date: this.date, location: this.location, description: this.description, going: this.going, saved: this.saved};
    console.log('event edit: see here:' + this.name + this.date + this.location + this.description);
    this.eventService.updateEvent(this.eventId, this.postevent).subscribe((event: any) => {
      this.postevent = event;
      console.log('event id: see here:' + this.eventId);
      this.router.navigate(['/user/' + this.userId + '/event/']);
    });


}
