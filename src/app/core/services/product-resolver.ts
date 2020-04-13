import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/shared/interfaces';
import { IAppState, selectProductById } from 'src/app/+store';
import { Store, select } from '@ngrx/store';
import { ProductRequested } from 'src/app/+store/product/actions';
import { pipe } from 'rxjs';
import { tap, first, filter, delay } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
    constructor(private store: Store<IAppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const prodId = route.paramMap.get('id');
        return this.store.pipe(
                select(selectProductById(prodId)),
                tap(prod => {
                    if (!prod) {
                        this.store.dispatch(new ProductRequested());
                    }
                }),
                filter(prod => !!prod),
                delay(1000),
                first()
            );
    }
}
