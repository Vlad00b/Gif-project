import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {HomeComponent} from './home/home.component';
import {GifsListComponent} from './shared/components/gifs-list/gifs-list.component';
import {GifService} from './shared/services/gif.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CollectionComponent} from './collection/collection.component';
import {CollectionService} from './shared/services/collection.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    GifsListComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    SharedModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    NgxSmartModalModule
  ],
  providers: [GifService, CollectionService, NgxSmartModalService],
  exports: [InfiniteScrollModule, NgxSmartModalModule]
})
export class MainModule {
}
