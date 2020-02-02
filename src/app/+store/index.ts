import { reducer as authReducer, IState as IAuthState } from './auth/reducer';
import { reducer as prodReducer, IState as IProdState } from './product/reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './auth/selectors';
import * as prod from './product/selectors';
import { RouterStateUrl } from '../core/app-router-serializer';
import { routerReducer, RouterReducerState, getSelectors } from '@ngrx/router-store';

export interface IAppState {
    auth: IAuthState;
    prod: IProdState;
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers = {
    auth: authReducer,
    prod: prodReducer,
    router: routerReducer,
};

/* Auth Selectors */

export const getAuthStore = createFeatureSelector('auth');
export const getAuthUsername = createSelector(getAuthStore, auth.getUsername);
export const getAuthErrorMessage = createSelector(getAuthStore, auth.getErrorMessage);
export const getAuthIsAdmin = createSelector(getAuthStore, auth.getIsAdmin);

/* Product Selectors */

export const getProductStore = createFeatureSelector('prod');
export const getProducts = createSelector(getProductStore, prod.getProducts);
export const getProduct = createSelector(getProductStore, prod.getProduct);

/* Route Selectors */

export const getRouterStore = createFeatureSelector('router');
export const getRouterUrl = createSelector(getRouterStore, (routerState: RouterReducerState<RouterStateUrl>) => {
    return routerState ? routerState.state.url : '';
});
export const getRouterParams = createSelector(getRouterStore, (routerState: RouterReducerState<RouterStateUrl>) => {
    return routerState ? routerState.state.params : '';
});
export const getRouterQParams = createSelector(getRouterStore, (routerState: RouterReducerState<RouterStateUrl>) => {
    return routerState ? routerState.state.queryParams : '';
});

export const getId = createSelector(getRouterStore, (routerState: RouterReducerState<RouterStateUrl>) => {
    return routerState ? routerState.state.params.id : '';
});

