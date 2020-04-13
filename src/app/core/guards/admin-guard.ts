import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState, getAuthIsAdmin } from 'src/app/+store';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<IAppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(getAuthIsAdmin),
            filter(isAdmin => isAdmin !== null));
    }

}
