import { IAction } from 'src/app/shared/interfaces';
import { Product } from 'src/app/shared/interfaces';

export const ActionTypes = {
  GetLatest: '[PROD] Get Latest Games',
  GetLatestSuccess: '[PROD] Get Latest Games Success',
  GetLatestFailed: '[PROD] Get Latest Games Failed',
  LoadProduct: '[PROD] Load Product',
  LoadProductSuccess: '[PROD] Load Product Success',
  LoadProductFailed: '[PROD] Load Product Failed',
};

export class GetLatest implements IAction<null> {
    type = ActionTypes.GetLatest;
    constructor(public payload: null = null) { }
}

export class GetLatestSuccess implements IAction<{ products: Product[] }> {
    type = ActionTypes.GetLatestSuccess;
    constructor(public payload: { products: Product[] } ) { }
}

export class GetLatestFailed implements IAction<{ error: any }> {
    type = ActionTypes.GetLatestFailed;
    constructor(public payload: { error: any }) { }
}

export class LoadProduct implements IAction<null> {
    type = ActionTypes.LoadProduct;
    constructor(public payload: null = null) { }
}

export class LoadProductSuccess implements IAction<{ product: Product }> {
    type = ActionTypes.LoadProductSuccess;
    constructor(public payload: { product: Product }) { }
}

export class LoadProductFailed implements IAction<{ error: any }> {
    type = ActionTypes.LoadProductFailed;
    constructor(public payload: { error: any }) { }
}

export type Actions = GetLatest | GetLatestSuccess | GetLatestFailed |
 LoadProduct | LoadProductSuccess | LoadProductFailed;
