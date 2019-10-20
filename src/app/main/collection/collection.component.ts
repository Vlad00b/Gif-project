import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollectionService} from '../shared/services/collection.service';
import {NotificationService} from '../../shared/services/notification.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  myCollection: any = [];
  upload: FormGroup;

  constructor(public router: ActivatedRoute,
              public fb: FormBuilder,
              public collectionService: CollectionService,
              public notification: NotificationService) {
  }

  ngOnInit() {
    this.upload = this.fb.group({
      file: [null, Validators.required],
      tag: ['', Validators.required]
    });
    this.myCollection = this.router.snapshot.data.collection;
  }

  uploadFile(ev) {
    if (this.upload.valid) {
      this.collectionService.uploadGif(this.upload.value)
        .subscribe(res => {
          this.collectionService.getGifsId(res['id']);
          this.collectionService.getCollection()
            .subscribe(res => {
              this.myCollection = res;
              ev.value = '';
              this.upload.patchValue({
                file: null,
                tag: ''
            });
          });
        }, error => {
            this.notification.errorToast('Gif has not been uploaded');
        });
    }
  }

  getFile(ev) {
    this.upload.patchValue({
      file: ev.files[0]
    });
  }

  deleteGif(ev) {
    this.myCollection = this.myCollection.filter(item => item.id !== ev);
    let collection = JSON.parse(localStorage.getItem('my_collection'));
    collection = collection.filter(item => item !== ev);
    localStorage.setItem('my_collection', JSON.stringify(collection));
  }

}
