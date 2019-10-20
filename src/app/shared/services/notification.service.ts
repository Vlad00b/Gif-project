import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(public toast: ToastrService) {
  }

  successToast(message: string) {
    this.toast.success(message, 'Success');
  }

  errorToast(message: string) {
    this.toast.error(message, 'Error');
  }
}
