import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private userService: UserService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(!this.userService.isLoggedIn()){
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
      return true;
    }
}
