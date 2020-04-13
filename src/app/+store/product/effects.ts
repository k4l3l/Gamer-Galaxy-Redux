import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { switchMap, map, catchError, tap, withLatestFrom, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { IAppState, getId, selectLatest } from '..';
import { Store, select } from '@ngrx/store';


@Injectable({
    providedIn: 'root'
})

export class ProdEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private store: Store<IAppState>,
        private router: Router
        ) { }

    @Effect() getLatest$ = this.actions$.pipe(
        ofType<actions.LatestRequested>(actions.ActionTypes.LatestRequested),
        delay(1000),
        withLatestFrom(this.store.pipe(select(selectLatest))),
        switchMap(([ action, prods ]) => {
            if (prods.length === 0) {
                return this.productService.getLatest().pipe(
                    map((products) =>  new actions.LatestLoadedSuccess({ products })),
                    catchError((err) => [new actions.LatestLoadedFailed({ error: err})])
                );
            } else {
                return [new actions.LatestLoadedSuccess({ products: prods })];
            }
        }),
    );

    @Effect() loadProduct$ = this.actions$.pipe(
        ofType<actions.ProductRequested>(actions.ActionTypes.ProductRequested),
        withLatestFrom(this.store.pipe(select(getId))),
        switchMap(([ action, valueFromStore ]) => {
            return this.productService.getOne(valueFromStore).pipe(
            map(res => new actions.ProductLoadedSuccess({ product: res.product })),
            catchError((err) => [new actions.ProductLoadedFailed({ error: err })])
            );
        })
    );

    @Effect() createProduct$ = this.actions$.pipe(
        ofType<actions.ProductCreated>(actions.ActionTypes.ProductCreated),
        map(action => action.payload),
        switchMap((data) => this.productService.create(data).pipe(
            map(({ message, errors, product }) => new actions.ProductCreatedSuccess({ message, errors, product})),
            tap(() => this.router.navigate(['/'])),
            catchError((err) => [new actions.ProductCreatedFailed({ error: err })])
        ))
    );

    @Effect() editProduct$ = this.actions$.pipe(
        ofType<actions.ProductEdited>(actions.ActionTypes.ProductEdited),
        map(action => action.payload),
        switchMap((data) => this.productService.edit(data).pipe(
            map(({ message }) => new actions.ProductEditedSuccess({ message, product: data.product })),
            tap(() => this.router.navigate(['/'])),
            catchError((err) => [new actions.ProductEditedFailed({ error: err })])
        ))
    );

    @Effect() deleteProduct$ = this.actions$.pipe(
        ofType<actions.ProductDeleted>(actions.ActionTypes.ProductDeleted),
        map(action => action.payload),
        switchMap( data => {
            const { id } = data;
            return this.productService.remove(id).pipe(
                map(() => new actions.ProductDeletedSuccess({ id })),
                catchError((err) => [new actions.ProductDeletedFailed({ error: err })])
            );
        } )
    );

}
