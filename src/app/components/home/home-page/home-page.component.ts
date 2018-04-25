import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  query: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }
  search(){
    var query = (document.getElementById('query') as HTMLInputElement).value;
    location.reload();
    this.router.navigate(['/search/'+query]);
  }

}
