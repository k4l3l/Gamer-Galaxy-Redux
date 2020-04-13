import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState, getAuthUsername } from 'src/app/+store';
import { Store, select } from '@ngrx/store';
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<IAppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /* Problem is select emits null value at first, then emits second time the real value...
         need to return observable when the store emits the value
        */

        return this.store.pipe(
            select(getAuthUsername),
            // wait for auth init -> the value might be undefined or string
            filter(username => username === undefined || typeof username === 'string'),
            switchMap( u => {
                if (u) {
                    return of(false);
                } else {
                    return of(true);
                }
            }),
            );


    }

}
