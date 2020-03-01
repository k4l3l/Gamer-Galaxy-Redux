import { Component, OnInit } from '@angular/core';
import { IAppState, getProducts } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { GetLatest } from 'src/app/+store/product/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private store: Store<IAppState>) { }
  
  products$ = this.store.select(getProducts);

  ngOnInit() {
    this.store.dispatch(new GetLatest());
  }
  
}
