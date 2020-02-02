import { IState } from './reducer';

export const getProducts = (state: IState) => state.products;
export const getProduct = (state: IState) => state.selectedProduct;
