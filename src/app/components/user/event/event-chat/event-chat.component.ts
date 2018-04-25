import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../../services/event.service.client';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';
import {Event} from '../../../../models/event.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service.client';


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
  arrattids: string[];
  username : string;
  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
      this.eventService.findEventById(this.eventId).subscribe(res => {
        this.event = res;
        this.arrattids = this.event.attendees.split(',');
        this.arrattendees = [];
        for(var i=0; i<this.arrattids.length; i++){
          this.userService.findUserById(this.arrattids[i]).subscribe( (user: User) => {
            this.arrattendees.push(user['username'].split('@')[0]);
          }, err => {
            console.log(err);
            //alert('Error!');
          });
        }
    });
      this.userService.findUserById(this.userId).subscribe( (user: User) => {
        this.username = user['username'].split('@')[0];

      }, err => {
        console.log(err);
        //alert('Error!');
      });
  });
  }
  logout() {
    this.userService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      });
  }

  search(){
    var query = (document.getElementById('query') as HTMLInputElement).value;
    location.reload();
    this.router.navigate(['/search/'+query]);
  }


}
