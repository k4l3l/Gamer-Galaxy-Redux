import { reducer as authReducer, IState as IAuthState } from './auth/reducer';
import { reducer as prodReducer, ProductsState } from './product/reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './auth/selectors';
import * as prod from './product/selectors';
import { RouterStateUrl } from '../core/app-router-serializer';
import { routerReducer, RouterReducerState, getSelectors } from '@ngrx/router-store';

export interface IAppState {
    auth: IAuthState;
    prod: ProductsState;
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

export const createProductSelectors = createFeatureSelector<ProductsState>('prod');
export const selectProductById = (productId: string) => createSelector(
    createProductSelectors,
    (state: ProductsState) => state.entities[productId]
);
export const selectLatest = createSelector(
    createProductSelectors,
    (state: ProductsState) => {
        return state.latestProducts; }
);

export const selectLoadingIndicator = createSelector(
    createProductSelectors,
    productState => productState.isLoading
);


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

