import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: boolean;
  constructor(public router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    this.authService.login$.subscribe(res => {
        this.login = res;
    });
  }

  logOut() {
    this.router.navigateByUrl('/auth');
    this.authService.checkLogin(false);
    localStorage.removeItem('login');
  }

}
