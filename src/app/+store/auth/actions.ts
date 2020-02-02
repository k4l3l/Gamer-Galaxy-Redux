import { IAction } from 'src/app/shared/interfaces';

export const ActionTypes = {
  Register: '[AUTH] Register',
  RegisterSuccess: '[AUTH] Register Success',
  RegisterFailed: '[AUTH] Register Failed',

  Login: '[AUTH] Login',
  LoginSuccess: '[AUTH] Login Success',
  LoginFailed: '[AUTH] Login Failed',

  Logout: '[AUTH] Logout',
  LogoutSuccess: '[AUTH] Logout Success',
  LogoutFailed: '[AUTH] Logout Failed',

  AuthCheck: '[AUTH] AuthCheck',
  AuthCheckSuccess: '[AUTH] AuthCheck Success',
  AuthCheckFailed: '[AUTH] AuthCheck Failed',
};

export class Register implements IAction<{username: string, email: string, password: string}> {
    type = ActionTypes.Register;
    constructor(public payload: {username: string, email: string, password: string}) { }
}

export class RegisterSuccess implements IAction<{ message: string }> {
    type = ActionTypes.RegisterSuccess;
    constructor(public payload: { message: string } ) { }
}

export class RegisterFailed implements IAction<{ error: any }> {
    type = ActionTypes.RegisterFailed;
    constructor(public payload: { error: any }) { }
}

export class Login implements IAction<{email: string, password: string}> {
    type = ActionTypes.Login;
    constructor(public payload: {email: string, password: string}) { }
}

export class LoginSuccess implements IAction<{ message: string, username: string, roles: string[]}> {
    type = ActionTypes.LoginSuccess;
    constructor(public payload: { message: string, username: string, roles: string[]}) { }
}

export class LoginFailed implements IAction<{ error: any }> {
    type = ActionTypes.LoginFailed;
    constructor(public payload: { error: any }) { }
}

export class Logout implements IAction<null> {
    type = ActionTypes.Logout;
    constructor(public payload: null = null) { }
}

export class LogoutSuccess implements IAction<{ message: string }> {
    type = ActionTypes.LogoutSuccess;
    constructor(public payload: { message }) { }
}

export class LogoutFailed implements IAction<{ error: any }> {
    type = ActionTypes.LogoutFailed;
    constructor(public payload: { error: any } ) { }
}

export class AuthCheckSuccess implements IAction<{ username: string, isAdmin: boolean }> {
    type = ActionTypes.AuthCheckSuccess;
    constructor(public payload: { username: string, isAdmin: boolean }) { }
}

export class AuthCheckFailed implements IAction<{ error: any }> {
    type = ActionTypes.AuthCheckFailed;
    constructor(public payload: { error: any } ) { }
}

export type Actions = Register | RegisterSuccess | RegisterFailed |
Login | LoginSuccess | LoginFailed |
Logout | LogoutSuccess | LogoutFailed |
AuthCheckSuccess | AuthCheckFailed;
