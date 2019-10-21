import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from '../../../../auth/shared/auth.service';
import {CollectionService} from '../../services/collection.service';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.scss']
})
export class GifsListComponent implements OnInit, OnChanges {

  @Input('gif') gifs: any;
  @Output('deleted') deleted: any = new EventEmitter<string>();
  myCollection: string[] = [];
  selectedGif: any;
  login: boolean;

  constructor(public authService: AuthService,
              public collectionService: CollectionService) {
  }

  ngOnInit() {
    this.authService.login$
      .subscribe(res => {
        this.login = res;
      });
  }

  ngOnChanges(change: SimpleChanges) {
    this.getMyCollection();
  }

  getMyCollection(): void {
    this.myCollection = JSON.parse(localStorage.getItem('my_collection'));
    for (const gif of this.gifs) {
      for (const myGif of this.myCollection) {
        if (gif.id === myGif) {
          gif.like = true;
        }
      }
    }
  }

  addToCollection(item: any) {
    item.like = !item.like;
    if (item.like) {
      this.collectionService.getGifsId(item.id);
    } else {
      this.deleted.emit(item.id);
    }
  }

  openModal(modal: any, gif: string) {
    this.selectedGif = gif;
    modal.open();
  }

}
