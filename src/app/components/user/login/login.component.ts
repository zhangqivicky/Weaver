import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  email: string;
  password: string;
  errorFlag: boolean;
  errorMsg: string;

  constructor(private userService: UserService,
              private router: Router) {}
  ngOnInit() {
  }

  login() {
    this.userService.findUserByCredentials(this.email, this.password).subscribe(
      res => {
        this.user = res;
        if (this.user['_id']) {
          this.errorFlag = false;
          this.router.navigate(['/user/' + this.user['_id']]);
        } else {
          this.errorFlag = true;
          this.errorMsg = 'Invalid email or password !';
        }
      }, err => {
        this.errorFlag = true;
        this.errorMsg = 'Something is wrong !';
      }
    );
  }

  showPassword() {
    const x = (document.getElementById('password') as HTMLInputElement);
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

}
