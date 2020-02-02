import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { Login } from 'src/app/+store/auth/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private store: Store<IAppState>) { }

  login(value: any) {
    const {email, password } = value;
    this.store.dispatch(new Login({ email, password}));
  }

}
