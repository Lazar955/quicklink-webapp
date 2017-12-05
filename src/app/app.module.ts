import { AuthGuardService } from '../services/auth-guard.service';
import { BrokerService } from '../services/broker.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LinksComponent } from './links/links.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LinksComponent,
    HeaderComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
MatTableModule,
    HttpClientModule
  ],
  providers: [BrokerService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
