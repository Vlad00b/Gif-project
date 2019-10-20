import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    if (this.authService.signIn(this.authForm.value)) {
      this.authService.checkLogin(true);
      this.router.navigateByUrl('/main');
    }
  }

  signUp() {
    this.authService.signUp(this.authForm.value);
    this.authService.checkLogin(true);
    this.router.navigateByUrl('/main');
  }

}
