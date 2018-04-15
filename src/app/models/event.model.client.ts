export class Event {
  name: string;
  date: Date;
  location: string;
  description: string;
  constructor(name, date, location, description) {
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
  }
}
