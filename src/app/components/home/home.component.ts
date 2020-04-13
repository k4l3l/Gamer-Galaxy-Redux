import { Component, OnInit } from '@angular/core';
import { IAppState, selectLatest, selectLoadingIndicator } from 'src/app/+store';
import { Store, select } from '@ngrx/store';
import { LatestRequested } from 'src/app/+store/product/actions';
import { Observable, pipe } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.products$ = this.store.pipe(
      select(selectLatest),
      // This solves the ExpressionChangedAfterItWasChecked error..
      delay(0),
      pipe(
        tap(prods => {
          if (prods.length === 0) {
            this.store.dispatch(new LatestRequested());
          }
        })
      )
    );
  }

}
