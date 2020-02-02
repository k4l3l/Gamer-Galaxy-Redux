import { IState } from './reducer';

export const getUsername = (state: IState) => state.username;
export const getErrorMessage = (state: IState) => state.errorMessage;
export const getIsAdmin = (state: IState) => state.isAdmin;
