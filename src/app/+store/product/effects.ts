import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { IAppState, getRouterParams, getId } from '..';
import { Store, select } from '@ngrx/store';


@Injectable({
    providedIn: 'root'
})

export class ProdEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<IAppState>
        ) { }

    @Effect() getLatest$ = this.actions$.pipe(
        ofType<actions.GetLatest>(actions.ActionTypes.GetLatest),
        map(action => action.payload),
        switchMap(() => this.productService.getLatest().pipe(
            map((products) => new actions.GetLatestSuccess({ products })),
            catchError((err) => [new actions.GetLatestFailed({ error: err})])
        ))
    );

    @Effect() loadProduct$ = this.actions$.pipe(
        ofType<actions.LoadProduct>(actions.ActionTypes.LoadProduct),
        withLatestFrom(this.store.pipe(select(getId))),
        switchMap(([ action, valueFromStore ]) => {
            return this.productService.getOne(valueFromStore).pipe(
            tap((res) => console.log(res)),
            map(res => new actions.LoadProductSuccess({ product: res.product })),
            catchError((err) => [new actions.LoadProductFailed({ error: err })])
            );
        })
    );

}
