import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {APP_URL} from '../../../shared/constants/url';
import {map} from 'rxjs/operators';
import {Form} from '@angular/forms';

@Injectable()
export class CollectionService implements Resolve<any>{

  myCollection: any = [];

  constructor(public http: HttpClient) {
  }

  resolve() {
    return this.getCollection();
  }

  getCollection() {
    this.myCollection = JSON.parse(localStorage.getItem('my_collection'));
    if (this.myCollection.length) {
      const ids = this.myCollection.join();
      const params = new HttpParams().set('api_key', APP_URL.gifs.api_key)
        .append('ids', ids);
      return this.http.get(`${APP_URL.gifs.all}/v1/gifs`, {params: params})
        .pipe(
          map(res => res['data'])
        );
    } else {
      return this.myCollection;
    }
  }

  uploadGif(gif) {
    const file: FormData = new FormData();
    file.append('file', gif.file);
    return this.http.post(`${APP_URL.gifs.upload}?api_key=${APP_URL.gifs.api_key}&username=nerifagel&tags=${gif.tag}`, file)
      .pipe(
        map(res => res['data'])
      );
  }

  getGifsId(id) {
    this.myCollection.push(id);
    localStorage.setItem('my_collection', JSON.stringify(this.myCollection));
  }
}
