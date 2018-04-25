import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomePageComponent} from './components/home/home-page/home-page.component';
import {HomeEventComponent} from './components/home/home-event/home-event.component';
import {SearchEventComponent} from './components/home/search-event/search-event.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {EventListComponent} from './components/user/event/event-list/event-list.component';
import {EventNewComponent} from './components/user/event/event-new/event-new.component';
import {EventEditComponent} from './components/user/event/event-edit/event-edit.component';
import { EventDetailComponent} from './components/user/event/event-detail/event-detail.component';
import {EventAttendeeComponent } from './components/user/event/event-attendee/event-attendee.component';
import {EventChatComponent } from './components/user/event/event-chat/event-chat.component';
import {AuthenticationService} from './services/authentication.service.server';


const APP_ROUTES: Routes = [
  { path : '', component : HomePageComponent},
  { path : 'event', component : HomeEventComponent},
  { path : 'search/:query', component : SearchEventComponent},
  { path : 'event/:eid', component : HomeDetailComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'register' , component: RegisterComponent },
  { path : 'profile', component : ProfileComponent, canActivate: [AuthenticationService]},
  { path : 'user/:uid' , component: ProfileComponent},
  { path : 'user/:uid/event' , component: EventListComponent},
  { path : 'user/:uid/event/new' , component: EventNewComponent},
  { path : 'user/:uid/event/:eid', component: EventEditComponent},
  { path : 'user/:uid/event/:eid/detail', component: EventDetailComponent},
  { path : 'user/:uid/event/:eid/attendee', component: EventAttendeeComponent},
  { path : 'user/:uid/event/:eid/chat', component: EventChatComponent},
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

