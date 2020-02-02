import { ActionTypes, Actions, GetLatestSuccess, GetLatestFailed, LoadProduct, LoadProductSuccess, LoadProductFailed } from './actions';
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

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {

        case ActionTypes.GetLatestSuccess: {
            const { products } = (action as GetLatestSuccess).payload;
            return { ...state, products };
        }

        case ActionTypes.GetLatestFailed: {
            const { error } = (action as GetLatestFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case ActionTypes.LoadProductSuccess: {
            const { product } = (action as LoadProductSuccess).payload;
            return { ...state, selectedProduct: product };
        }

        case ActionTypes.LoadProductFailed: {
            const { error } = (action as LoadProductFailed).payload;
            return { ...state, errorMessage: error.message };
        }

    }
    return state;
}
