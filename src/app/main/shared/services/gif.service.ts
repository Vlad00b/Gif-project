import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APP_URL} from '../../../shared/constants/url';
import {map} from 'rxjs/operators';
import {Resolve} from '@angular/router';

@Injectable()
export class GifService implements Resolve<any> {

  gifs: any = [];
  count: number = 0;
  currentSearch: string = '';

  constructor(public http: HttpClient) {
  }

  resolve() {
    return this.getGifs();
  }

  getGifs(search: string = '') {
    this.count = 20;
    this.currentSearch = search === '' ? 'gif' : search;
    const params = new HttpParams().set('api_key', APP_URL.gifs.api_key)
      .append('q', `${this.currentSearch}`)
      .append('limit', `${this.count}`);
    return this.http.get(`${APP_URL.gifs.all}/v1/gifs/search`, {params: params})
      .pipe(map(res => this.gifs = res['data']));
  }

  getInfinityGifs() {
    this.count += 10;
    const params = new HttpParams().set('api_key', APP_URL.gifs.api_key)
      .append('q', `${this.currentSearch}`)
      .append('limit', `20`)
      .append('offset', `${this.count}`);
    return this.http.get(`${APP_URL.gifs.all}/v1/gifs/search`, {params: params})
      .pipe(map(res => this.gifs = this.gifs.concat(res['data'])));
  }
}
