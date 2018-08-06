import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs';

@Injectable()

export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private authFire: AngularFireAuth, 
    private router: ActivatedRoute, 
    private route: Router,
    private userService: UserService
  ) {
    this.user$ = this.authFire.authState;
  }

  loginwithgoogle() {
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || "/";
    localStorage.setItem('returnUrl', returnUrl);
    this.authFire.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.authFire.auth.signOut();
    this.route.navigateByUrl('/');
  }

  get appUser$(): Observable<AppUser>
  {
    return this.user$
    .switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();

      return of(null);
    })
  }
}
