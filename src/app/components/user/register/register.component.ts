import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  user: User;
  username: string ;
  password: string ;
  verifyPassword: string;
  errorFlag: boolean;
  errorMsg: string;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
  }

  validEmail(email) {
    const check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(email).toLowerCase()); }

  register() {
    this.username = this.registerForm.value.username.trim();
    this.password = this.registerForm.value.password.trim();
    this.verifyPassword = this.registerForm.value.verifyPassword.trim();
    if (!this.username || !this.password || !this.verifyPassword) {
      this.errorFlag = true;
      this.errorMsg = 'email or password or verify password is empty !';
      return;
    }
    if (!this.validEmail(this.username)) {
      this.errorFlag = true;
      this.errorMsg = 'The email format is unvalid !';
      return;
    }
    if (this.password !== this.verifyPassword) {
      this.errorFlag = true;
      this.errorMsg = 'The verify password does not match !';
      return;
    }

    this.userService.findUserByUsername(this.username).subscribe(
      (res: User) => {
        this.user = res;
        console.log("user:" + JSON.stringify(res));
        if (this.user) {
          this.errorFlag = true;
          this.errorMsg = 'This email already existed !';
        } else {
          this.userService.register(this.username, this.password).subscribe(
            user => {
              this.sharedService.user = user;
              this.router.navigate(['/profile']);
            }, err => {
              this.errorFlag = true;
              this.errorMsg = 'Something is wrong!';
            }
          );
        }}, err => {
        alert('Error!');
      }
    );
  }
}
