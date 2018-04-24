export class User {
  username: string;
  password: string;
  displayname: string;
  firstName: string;
  lastName: string;
  imgsrc: string;
  constructor(displayname, email, password, firstName, lastName, imgsrc) {
    this.displayname = displayname;
    this.username = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imgsrc = imgsrc;
  }
}

