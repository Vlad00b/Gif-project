import {Injectable} from '@angular/core';
import {NotificationService} from '../../shared/services/notification.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {

  public login = new BehaviorSubject(false);
  public login$ = this.login.asObservable();
  constructor(public notification: NotificationService) {
    if (localStorage.getItem('login')) {
      this.login.next(true);
    }
  }

  checkLogin(status: boolean): void {
    this.login.next(status);
  }

  signIn(userData: any): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.email !== userData.email) {
        this.notification.errorToast('Wrong email, try again');
        return false;
      }
      if (user.password !== userData.password) {
        this.notification.errorToast('Wrong password, try again');
        return false;
      }
    } else {
      this.notification.errorToast('User not found');
      return false;
    }
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('login', 'true');
    this.notification.successToast('Welcome!');
    return true;
  }

  signUp(userData: object): void {
    localStorage.setItem('my_collection', JSON.stringify([]));
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('login', 'true');
  }
}
