import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    @Effect() register$ = this.actions$.pipe(
        ofType<actions.Register>(actions.ActionTypes.Register),
        map(action => action.payload),
        switchMap((data) => this.authService.register(data).pipe(
            map(({ message }) => {
                return new actions.RegisterSuccess({ message });
            }),
            tap(() => this.router.navigate(['/login'])),
            catchError((err) => [new actions.RegisterFailed(err)])
        ))
    );

    @Effect() login$ = this.actions$.pipe(
        ofType<actions.Login>(actions.ActionTypes.Login),
        map( action => action.payload ),
        switchMap((data) => this.authService.login(data).pipe(
            map(({ message, user: { username, roles }}) => {
                return new actions.LoginSuccess({message, username, roles});
            }),
            tap(() =>  this.router.navigate([''])),
            catchError((err) => [new actions.LoginFailed({ error: err.error })])
        ))
    );

    @Effect() logout$ = this.actions$.pipe(
        ofType<actions.Logout>(actions.ActionTypes.Logout),
        switchMap(() => this.authService.logout()
        .pipe(
            map(({ message }) => {
                return new actions.LogoutSuccess(message);
            }),
            catchError((err) => [new actions.LogoutFailed({ error : err.error})])
        )
        )
    );

    @Effect() init$ = this.actions$.pipe(
        ofType('@ngrx/effects/init'),
        switchMap(() => this.authService.check()
        .pipe(
            map(({ username, isAdmin }) => {
                return new actions.AuthCheckSuccess({ username, isAdmin });
            }),
            catchError((err) => [new actions.AuthCheckFailed({error : err.error})])
        ))
    );
}
