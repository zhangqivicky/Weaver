import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl: String = '../../../assets/images/uploadImage.png';
  fileToUpload: File = null;
  selectedFile = null;
  user: User;
  userId: string;
  username: string;
  email: string;
  currentpassword: string;
  newpassword: string;
  confirmpassword: string;
  firstName: string;
  lastName: string;
  errorFlag: Boolean = false;
  errorMsg: string;

  constructor(private http: HttpClient,
              private userService: UserService,
              private activatedroute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
        this.userId = params['uid'];
      }
    );
    this.userService.findUserById(this.userId).subscribe(
      res => {
        this.user = res;
        this.username = this.user['username'];
        this.email = this.user['email'];
        this.firstName = this.user['firstName'];
        this.lastName = this.user['lastName'];
        this.currentpassword = this.user['password'];
      }, err => {
        alert('Error!');
      }
    );
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  uploadImage() {
    if (!this.fileToUpload) {
      this.errorFlag = true;
      this.errorMsg = 'Please select a photo !';
      return;
    }
    this.userService.postFile(this.userId, this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log('data:' + JSON.stringify(data));
      console.log('data:' + JSON.stringify(this.user));
      // this.user.imgsrc = data;
      // this.userService.updateUser(this.userId, this.user).subscribe();
    }, error => {
      console.log(error);
    });
  }

  updateProfile() {
    if (this.username) {
      this.username = this.username.trim();
    }
    if (this.firstName) {
      this.firstName = this.firstName.trim();
    }
    if (this.lastName) {
      this.lastName = this.lastName.trim();
    }
    if (this.newpassword) {
      this.newpassword = this.newpassword.trim();
    }
    if (this.confirmpassword) {
      this.confirmpassword = this.confirmpassword.trim();
    }
    if (this.newpassword !== this.confirmpassword) {
      this.errorFlag = true;
      this.errorMsg = 'The confirm password does not match !';
      return;
    }
    if (this.username && this.username.length > 0) {
      this.user['username'] = this.username;
    }
    if (this.firstName && this.firstName.length > 0) {
      this.user['firstName'] = this.firstName;
    }
    if (this.lastName && this.lastName.length > 0) {
      this.user['lastName'] = this.lastName;
    }
    if (this.newpassword && this.newpassword.length > 0) {
      this.user['password'] = this.newpassword;
    }
    this.errorFlag = false;
    this.userService.updateUser(this.userId, this.user).subscribe();
  }

  logout() {
    this.userService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      });
  }
}


