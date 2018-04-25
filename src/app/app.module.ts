import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import {enableProdMode} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';

enableProdMode();



import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { HomeEventComponent } from './components/home/home-event/home-event.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EventListComponent } from './components/user/event/event-list/event-list.component';
import { EventNewComponent } from './components/user/event/event-new/event-new.component';
import { EventEditComponent } from './components/user/event/event-edit/event-edit.component';
import { EventAttendeeComponent } from './components/user/event/event-attendee/event-attendee.component';
import { EventChatComponent } from './components/user/event/event-chat/event-chat.component';
import { EventDetailComponent} from './components/user/event/event-detail/event-detail.component';

import {UserService} from './services/user.service.client';
import {EventService} from './services/event.service.client';
import {SharedService} from './services/shared.service.client';
import {AuthenticationService} from './services/authentication.service.server';

import {Routing} from './app.routing';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { EventAttendeeComponent } from './components/user/event/event-attendee/event-attendee.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeEventComponent,
    HomeDetailComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EventListComponent,
    EventNewComponent,
    EventEditComponent,
    EventAttendeeComponent,
    EventChatComponent,
    EventDetailComponent,
    HomeDetailComponent,
    EventAttendeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    Routing
  ],
  providers: [UserService, EventService, SharedService, AuthenticationService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
