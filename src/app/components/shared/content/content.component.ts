import { Component, OnInit } from '@angular/core';
import { IAppState, selectLoadingIndicator } from 'src/app/+store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  loading$ = this.store.pipe(select(selectLoadingIndicator));

  constructor(private store: Store<IAppState>) {  }

  ngOnInit() { }

}
