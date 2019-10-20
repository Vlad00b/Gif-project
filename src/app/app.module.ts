import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/shared/auth.service';
import {MainModule} from './main/main.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    SharedModule,
    MainModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
