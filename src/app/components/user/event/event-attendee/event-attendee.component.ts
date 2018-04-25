import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-attendee',
  templateUrl: './event-attendee.component.html',
  styleUrls: ['./event-attendee.component.css']
})
export class EventAttendeeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
