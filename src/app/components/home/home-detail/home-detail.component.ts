import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Event} from '../../../models/event.model.client';
import {EventService} from '../../../services/event.service.client';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})

export class HomeDetailComponent implements OnInit {
  userId: string;
  eventId: string;
  event: Event;
  user: User;
  name: string;
  date: Date;
  location: string;
  description: string;
  attendees: string[];
  newevent: any;

  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
      this.eventService.findEventById(this.eventId).subscribe( (event: any ) => {
        this.newevent = event;
        this.name = this.newevent['name'];
        this.date = this.newevent['date'];
        this.location = this.newevent['location'];
        this.description = this.newevent['description'];
        this.attendees = this.newevent['attendees'];
      }, err => {
        alert('Error!'); });
      this.userService.findUserById(this.userId).subscribe( res => {
        this.user = res;
      }, err => {
        alert('Error!');
      });
    });
  }

  toHomePage(){
    this.router.navigate(['']);
  }

}


