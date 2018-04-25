import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../services/event.service.client';
import {Event} from '../../../models/event.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.css']
})
export class SearchEventComponent implements OnInit {
  query: string;
  events: Event[];

  constructor(private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.query = params['query'];
      console.log('query:' + this.query);
      this.eventService.queryAllEvents(this.query).subscribe(res => {
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

  search(){
    var query = (document.getElementById('query') as HTMLInputElement).value;
    this.router.navigate(['/search/'+query]);
  }

}
