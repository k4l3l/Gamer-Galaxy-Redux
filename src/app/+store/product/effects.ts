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
        private store: Store<IAppState>,
        private router: Router
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
            map(res => new actions.LoadProductSuccess({ product: res.product })),
            catchError((err) => [new actions.LoadProductFailed({ error: err })])
            );
        })
    );

    @Effect() createProduct$ = this.actions$.pipe(
        ofType<actions.CreateProduct>(actions.ActionTypes.CreateProduct),
        map(action => action.payload),
        switchMap((data) => this.productService.create(data).pipe(
            map(({ message, errors, product }) => new actions.CreateProductSuccess({ message, errors, product})),
            tap(() => this.router.navigate(['/'])),
            catchError((err) => [new actions.CreateProductFailed({ error: err })])
        ))
    );

    @Effect() editProduct$ = this.actions$.pipe(
        ofType<actions.EditProduct>(actions.ActionTypes.EditProduct),
        map(action => action.payload),
        switchMap((data) => this.productService.edit(data).pipe(
            map(({ message, errors, product }) => new actions.EditProductSuccess({ message, errors, product})),
            tap(() => this.router.navigate(['/'])),
            catchError((err) => [new actions.EditProductFailed({ error: err })])
        ))
    );

    @Effect() deleteProduct$ = this.actions$.pipe(
        ofType<actions.DeleteProduct>(actions.ActionTypes.DeleteProduct),
        map(action => action.payload),
        switchMap( data => {
            const { id } = data;
            return this.productService.remove(id).pipe(
                map(() => new actions.DeleteProductSuccess({ id })),
                catchError((err) => [new actions.DeleteProductFailed({ error: err })])
            );
        } )
    );

}
