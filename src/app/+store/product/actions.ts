import { IAction } from 'src/app/shared/interfaces';
import { Product } from 'src/app/shared/interfaces';

export const ActionTypes = {
  GetLatest: '[PROD] Get Latest Games',
  GetLatestSuccess: '[PROD] Get Latest Games Success',
  GetLatestFailed: '[PROD] Get Latest Games Failed',
  LoadProduct: '[PROD] Load Product',
  LoadProductSuccess: '[PROD] Load Product Success',
  LoadProductFailed: '[PROD] Load Product Failed',
  ClearProduct: '[PROD] Clear Product',
  CreateProduct: '[PROD] Create Product',
  CreateProductSuccess: '[PROD] Create Product Success',
  CreateProductFailed: '[PROD] Create Product Failed',
  EditProduct: '[PROD] Edit Product',
  EditProductSuccess: '[PROD] Edit Product Success',
  EditProductFailed: '[PROD] Edit Product Failed',
  DeleteProduct: '[PROD] Delete Product',
  DeleteProductSuccess: '[PROD] Delete Success',
  DeleteProductFailed: '[PROD] Delete Failed',
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

export class ClearProduct implements IAction<null> {
    type = ActionTypes.ClearProduct;
    constructor(public payload: null = null) { }
}

export class CreateProduct implements IAction<{product: any}> {
    type = ActionTypes.CreateProduct;
    constructor(public payload: {product: any}) { }
}

export class CreateProductSuccess implements IAction<{ message: string, product: Product, errors: any }> {
    type = ActionTypes.CreateProductSuccess;
    constructor(public payload: { message: string, product: Product, errors: any }) { }
}

export class CreateProductFailed implements IAction<{ error: any }> {
    type = ActionTypes.CreateProductFailed;
    constructor(public payload: { error: any }) { }
}

export class EditProduct implements IAction<{product: any}> {
    type = ActionTypes.EditProduct;
    constructor(public payload: {product: any}) { }
}

export class EditProductSuccess implements IAction<{ message: string, product: Product, errors: any }> {
    type = ActionTypes.EditProductSuccess;
    constructor(public payload: { message: string, product: Product, errors: any }) { }
}

export class EditProductFailed implements IAction<{ error: any }> {
    type = ActionTypes.EditProductFailed;
    constructor(public payload: { error: any }) { }
}

export class DeleteProduct implements IAction<{ id: string }> {
    type = ActionTypes.DeleteProduct;
    constructor(public payload: { id: string }) { }
}

export class DeleteProductSuccess implements IAction<{ id: string }> {
    type = ActionTypes.DeleteProductSuccess;
    constructor(public payload: { id: string }) { }
}

export class DeleteProductFailed implements IAction<{ error: any }> {
    type = ActionTypes.DeleteProductFailed;
    constructor(public payload: { error: any }) { }
}

export type Actions =  GetLatest | GetLatestSuccess | GetLatestFailed |
                    LoadProduct | LoadProductSuccess | LoadProductFailed | ClearProduct |
                    CreateProduct | CreateProductSuccess | CreateProductFailed |
                    DeleteProduct | DeleteProductSuccess | DeleteProductFailed |
                    EditProduct | EditProductSuccess | EditProductFailed;
