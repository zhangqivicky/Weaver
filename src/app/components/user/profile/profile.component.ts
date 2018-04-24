import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
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
  displayname: string;
  username: string;
  currentPassword: string;
  newPassword: string;
  verifyPassword: string;
  firstName: string;
  lastName: string;
  imgsrc: string;
  errorFlag: Boolean = false;
  errorMsg: string;

  constructor(private http: HttpClient,
              private userService: UserService,
              private sharedService: SharedService,
              private router: Router) {}

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.sharedService.user._id;
    this.currentPassword = this.user['password'];
    this.displayname = this.user['displayname'];
    this.username = this.user['username'];
    this.firstName = this.user['firstName'];
    this.lastName = this.user['lastName'];
    this.imgsrc = this.user['imgsrc'];
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
    if (this.newPassword) {
      this.newPassword = this.newPassword.trim();
    }
    if (this.verifyPassword) {
      this.verifyPassword = this.verifyPassword.trim();
    }
    if (this.newPassword !== this.verifyPassword) {
      this.errorFlag = true;
      this.errorMsg = 'The password and verify password does not match !';
      return;
    } else if (this.newPassword ) {
      if(this.newPassword.length > 16) {
        this.errorFlag = true;
        this.errorMsg = 'The length of password should be no more than than 16 !';
        return;
      }
      this.user['password'] = this.newPassword;
    }
    if (this.displayname) {
      this.user['displayname'] = this.displayname.trim();
    }
    if (this.firstName) {
      this.user['firstName'] = this.firstName.trim();
    }
    if (this.lastName) {
      this.user['lastName'] = this.lastName.trim();
    }
    this.userService.updateUser(this.userId, this.user).subscribe();
  }

  logout() {
    this.userService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      });
  }
}


