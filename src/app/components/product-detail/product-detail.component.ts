import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { ProductRequested } from 'src/app/+store/product/actions';
import { Product } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

  product;


  ngOnInit() {
    this.route.data.subscribe( ({ product }) => this.product = product );
  }

}
