import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  user: User;
  email: string;
  password: string;
  errorFlag: boolean;
  errorMsg: string;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) {}
  ngOnInit() {
  }

  login() {
    this.email = this.loginForm.value.email.trim();
    this.password = this.loginForm.value.password.trim();

    if (!this.email || !this.password) {
      this.errorFlag = true;
      this.errorMsg = 'email or password is empty !';
      return;
    }
    this.userService.login(this.email, this.password).subscribe(
      res => {
        if (res) {
          this.sharedService.user = res;
          this.router.navigate(['/profile']);
        } else {
          this.errorFlag = true;
          this.errorMsg = 'email and password does not match !';
        }}, err => {
        this.errorFlag = true;
        this.errorMsg = 'something is wrong !';
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
