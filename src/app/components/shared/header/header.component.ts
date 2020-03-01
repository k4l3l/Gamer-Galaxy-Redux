import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getAuthUsername, getAuthIsAdmin } from 'src/app/+store';
import { Logout } from 'src/app/+store/auth/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(private store: Store<IAppState>) { }

  username$ = this.store.select(getAuthUsername);
  isAdmin$ = this.store.select(getAuthIsAdmin);

  logout() {
    return this.store.dispatch(new Logout());
  }

}
