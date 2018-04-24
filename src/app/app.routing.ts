import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomePageComponent} from './components/home/home-page/home-page.component';
import {HomeEventComponent} from './components/home/home-event/home-event.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {EventListComponent} from './components/user/event/event-list/event-list.component';
import {EventNewComponent} from './components/user/event/event-new/event-new.component';
import {EventEditComponent} from './components/user/event/event-edit/event-edit.component';
import { EventProfileComponent} from './components/event/event-profile/event-profile.component';
import {EventAttComponent } from './components/event/event-att/event-att.component';
import {EventChatComponent } from './components/event/event-chat/event-chat.component';
import {AuthenticationService} from './services/authentication.service.server';

const APP_ROUTES: Routes = [
  { path : '', component : HomePageComponent},
  { path : 'event', component : HomeEventComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'register' , component: RegisterComponent },
  { path : 'profile', component : ProfileComponent, canActivate: [AuthenticationService]},
  { path : 'user/:uid' , component: ProfileComponent},
  { path : 'user/:uid/event' , component: EventListComponent},
  { path : 'user/:uid/event/new' , component: EventNewComponent},
  { path : 'user/:uid/event/:eid', component: EventEditComponent},
  { path : 'event/:eid/', component: EventProfileComponent},
  { path : 'event/:eid/attendee', component: EventAttComponent},
  { path : 'event/:eid/chat', component: EventChatComponent}

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

