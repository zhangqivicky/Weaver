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
import { HomeEventComponent } from './components/event/home-event/home-event.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventNewComponent } from './components/event/event-new/event-new.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';
import { EventAttComponent } from './components/event/event-att/event-att.component';
import {UserService} from './services/user.service.client';
import {EventService} from './services/event.service.client';

import {Routing} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeEventComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EventListComponent,
    EventNewComponent,
    EventEditComponent,
    EventAttComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    Routing
  ],
  providers: [UserService, EventService,  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
