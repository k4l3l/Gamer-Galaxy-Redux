import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getProduct, getRouterUrl } from 'src/app/+store';
import { LoadProduct } from 'src/app/+store/product/actions';
import { Product } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private store: Store<IAppState>) { }

  product$: Observable<Product> = this.store.select(getProduct);


  ngOnInit() {
    this.store.dispatch(new LoadProduct());
  }

}
