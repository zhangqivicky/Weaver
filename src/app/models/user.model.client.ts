export class User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imgsrc: string;
  constructor(username, email, password, firstName, lastName, imgsrc) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imgsrc = imgsrc;
  }
}

