import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {EventService} from '../../../services/event.service.client';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {
  userId: string;
  event: any;
  name: string;
  date: Date;
  location: string;
  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
    });
  }
  toProfile() {
    this.router.navigate(['/user/' + this.userId]);
  }
  dropdown() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    var div = document.getElementById('myDropdown');
    a = div.getElementsByTagName('a');
    for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }
  addEvent() {
    this.event = {name: this.name, date: this.date, location: this.location};
    this.eventService.createEvent(this.userId, this.event).subscribe(
      res => {
        this.event = res;
        if (this.event['_id']) {
          console.log(JSON.stringify(this.event));
          this.router.navigate(['/user/' + this.userId + '/event']);
        } else {
          return;
        }}, err => {
        alert('Error!');
      });
  }
  toEventList() {
    this.router.navigate(['/user/' + this.userId + '/event']);
  }
}

