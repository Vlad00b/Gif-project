import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../../auth/shared/auth.service';

@Injectable()
export class CollectionGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Promise<boolean> {
      if (this.authService.login.value) {
        return true;
      } else {
        this.router.navigateByUrl('/main');
      }
  }
}
