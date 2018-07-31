import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AdminAuthGaurd implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) {  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin)
    }

}
