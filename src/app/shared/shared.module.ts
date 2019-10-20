import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationService} from './services/notification.service';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent],
  providers: [NotificationService]
})
export class SharedModule {
}
