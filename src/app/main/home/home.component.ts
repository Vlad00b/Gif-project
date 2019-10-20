import {Component, OnInit} from '@angular/core';
import {GifService} from '../shared/services/gif.service';
import {ActivatedRoute} from '@angular/router';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gifList: any;
  search$: Observable<any>;

  constructor(public gifService: GifService,
              public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.gifList = this.router.snapshot.data.gif;
    const search = document.getElementById('search');
    this.search$ = fromEvent<any>(search, 'input')
      .pipe(
        map(event => event.target.value),
        debounceTime(500),
        distinctUntilChanged()
      );
    this.search$.subscribe(val => {
      this.gifService.getGifs(val)
        .subscribe(res => {
          this.gifList = res;
        });
    });
  }

  onScroll() {
    this.gifService.getInfinityGifs()
      .subscribe(res => {
        this.gifList = res;
      });
  }

  deletedGif(ev) {
    let collection = JSON.parse(localStorage.getItem('my_collection'));
    collection = collection.filter(item => item !== ev);
    localStorage.setItem('my_collection', JSON.stringify(collection));
  }

}
