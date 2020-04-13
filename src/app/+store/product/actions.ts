import { IAction } from 'src/app/shared/interfaces';
import { Product } from 'src/app/shared/interfaces';

export enum ActionTypes {
  LatestRequested = '[Home Component] Latest Requested',
  LatestLoadedSuccess = '[Product API] Latest Loaded Success',
  LatestLoadedFailed = '[Product API] Latest Loaded Failed',
  ProductRequested = '[Product Details Component] Product Requested',
  ProductLoadedSuccess = '[Product API] Product Loaded Success',
  ProductLoadedFailed = '[Product API] Product Loaded Failed',
  ProductCreated = '[Product Create Component] Product Created',
  ProductCreatedSuccess = '[Product API] Product Created Success',
  ProductCreatedFailed = '[Product API] Product Created Failed',
  ProductEdited = '[Edit Product Component] Product Edited',
  ProductEditedSuccess = '[Product API] Product Edited Success',
  ProductEditedFailed = '[Product API] Product Edited Failed',
  ProductDeleted = '[Delete Product Dialog] Product Deleted',
  ProductDeletedSuccess = '[Product API] Product Delete Success',
  ProductDeletedFailed = '[Product API] Product Delete Failed',
}

export class LatestRequested implements IAction<null> {
    type = ActionTypes.LatestRequested;
    constructor(public payload: null = null) { }
}

export class LatestLoadedSuccess implements IAction<{ products: Product[] }> {
    type = ActionTypes.LatestLoadedSuccess;
    constructor(public payload: { products: Product[] } ) { }
}

export class LatestLoadedFailed implements IAction<{ error: any }> {
    type = ActionTypes.LatestLoadedFailed;
    constructor(public payload: { error: any }) { }
}

export class ProductRequested implements IAction<null> {
    type = ActionTypes.ProductRequested;
    constructor(public payload: null = null) { }
}

export class ProductLoadedSuccess implements IAction<{ product: Product }> {
    type = ActionTypes.ProductLoadedSuccess;
    constructor(public payload: { product: Product }) { }
}

export class ProductLoadedFailed implements IAction<{ error: any }> {
    type = ActionTypes.ProductLoadedFailed;
    constructor(public payload: { error: any }) { }
}

export class ProductCreated implements IAction<{product: any}> {
    type = ActionTypes.ProductCreated;
    constructor(public payload: {product: any}) { }
}

export class ProductCreatedSuccess implements IAction<{ message: string, product: Product, errors: any }> {
    type = ActionTypes.ProductCreatedSuccess;
    constructor(public payload: { message: string, product: Product, errors: any }) { }
}

export class ProductCreatedFailed implements IAction<{ error: any }> {
    type = ActionTypes.ProductCreatedFailed;
    constructor(public payload: { error: any }) { }
}

export class ProductEdited implements IAction<{product: Product}> {
    type = ActionTypes.ProductEdited;
    constructor(public payload: {product: Product}) { }
}

export class ProductEditedSuccess implements IAction<{ message: string, product: Product }> {
    type = ActionTypes.ProductEditedSuccess;
    constructor(public payload: { message: string, product: Product }) { }
}

export class ProductEditedFailed implements IAction<{ error: any }> {
    type = ActionTypes.ProductEditedFailed;
    constructor(public payload: { error: any }) { }
}

export class ProductDeleted implements IAction<{ id: string }> {
    type = ActionTypes.ProductDeleted;
    constructor(public payload: { id: string }) { }
}

export class ProductDeletedSuccess implements IAction<{ id: string }> {
    type = ActionTypes.ProductDeletedSuccess;
    constructor(public payload: { id: string }) { }
}

export class ProductDeletedFailed implements IAction<{ error: any }> {
    type = ActionTypes.ProductDeletedFailed;
    constructor(public payload: { error: any }) { }
}

export type Actions =  LatestRequested | LatestLoadedSuccess | LatestLoadedFailed |
                    ProductRequested | ProductLoadedSuccess | ProductLoadedFailed |
                    ProductCreated | ProductCreatedSuccess | ProductCreatedFailed |
                    ProductDeleted | ProductDeletedSuccess | ProductDeletedFailed |
                    ProductEdited | ProductEditedSuccess | ProductEditedFailed;
