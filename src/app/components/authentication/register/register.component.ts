import { Component } from '@angular/core';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { Register, RegisterFailed } from 'src/app/+store/auth/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private store: Store<IAppState>) { }

  register(value: any) {
    const { email, username, password, password2 } = value;
    if (password !== password2) {
      this.store.dispatch(new RegisterFailed({error: {message: 'Passwords don\'t match'}}));
    } else {
      this.store.dispatch(new Register({ email, username, password }));
    }
  }

}
