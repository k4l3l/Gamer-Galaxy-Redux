import * as actns from './actions';
import { Product } from 'src/app/shared/interfaces';


export interface IState {
    products: Product[];
    errorMessage: string;
    selectedProduct: Product;
}

const initialState: IState = {
    products: [],
    errorMessage: '',
    selectedProduct: null,
};

export function reducer(state = initialState, action: actns.Actions): IState {
    switch (action.type) {

        case actns.ActionTypes.GetLatestSuccess: {
            const { products } = (action as actns.GetLatestSuccess).payload;
            return { ...state, products };
        }

        case actns.ActionTypes.GetLatestFailed: {
            const { error } = (action as actns.GetLatestFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case actns.ActionTypes.LoadProductSuccess: {
            const { product } = (action as actns.LoadProductSuccess).payload;
            return { ...state, selectedProduct: product };
        }

        case actns.ActionTypes.LoadProductFailed: {
            // Create toast message?
            const { error } = (action as actns.LoadProductFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case actns.ActionTypes.ClearProduct: {
            return { ...state, selectedProduct: null };
        }

        case actns.ActionTypes.CreateProductSuccess: {
            return state;
        }

        case actns.ActionTypes.CreateProductFailed: {
            const { error } = (action as actns.EditProductFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case actns.ActionTypes.EditProductSuccess: {
            return state;
        }

        case actns.ActionTypes.EditProductFailed: {
            const { error } = (action as actns.EditProductFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case actns.ActionTypes.DeleteProductSuccess: {
            const { id } = (action as actns.DeleteProductSuccess).payload;
            const products = state.products.filter(p => p._id !== id);
            return { ...state, products };
        }

        case actns.ActionTypes.DeleteProductFailed: {
            const { error } = (action as actns.DeleteProductFailed).payload;
            return { ...state, errorMessage: error.message };
        }

    }
    return state;
}
