export class Event {
  name: string;
  date: Date;
  location: string;
  description: string;
  attendees: string;
  constructor(name, date, location, description, attendees) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.attendees = attendees;
  }
}
