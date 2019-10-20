import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {GifService} from './shared/services/gif.service';
import {CollectionComponent} from './collection/collection.component';
import {CollectionService} from './shared/services/collection.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'home', component: HomeComponent, resolve: {gif: GifService}},
      {path: 'collection', component: CollectionComponent, resolve: {collection: CollectionService}},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
