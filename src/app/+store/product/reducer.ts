import * as actns from './actions';
import { Product } from 'src/app/shared/interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export interface ProductsState extends EntityState<Product> {
    latestProducts: Product[];
    isLoading: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({ selectId: (p) => p._id});
const initialState = adapter.getInitialState({ latestProducts: [], isLoading: false });

export function reducer(state = initialState, action: actns.Actions): ProductsState {
    switch (action.type) {

        case actns.ActionTypes.LatestRequested: {
            return {...state, isLoading: true};
        }

        case actns.ActionTypes.LatestLoadedSuccess: {
            const { products } = (action as actns.LatestLoadedSuccess).payload;
            return {...state, latestProducts: products, isLoading: false};
        }

        case actns.ActionTypes.LatestLoadedFailed: {
            const { error } = (action as actns.LatestLoadedFailed).payload;
            return { ...state };
        }

        case actns.ActionTypes.ProductRequested: {
            return {...state, isLoading: true};
        }

        case actns.ActionTypes.ProductLoadedSuccess: {
            const { product } = (action as actns.ProductLoadedSuccess).payload;
            return adapter.addOne(product, {...state, isLoading: false});
        }

        case actns.ActionTypes.ProductLoadedFailed: {
            // Create toast message?
            const { error } = (action as actns.ProductLoadedFailed).payload;
            return { ...state };
        }

        case actns.ActionTypes.ProductCreatedSuccess: {
            const { product } = (action as actns.ProductCreatedSuccess).payload;
            const latest = [...state.latestProducts];
            latest.push(product);
            return adapter.upsertOne(product, {...state, latestProducts: latest});
        }

        case actns.ActionTypes.ProductCreatedFailed: {
            const { error } = (action as actns.ProductCreatedFailed).payload;
            return { ...state };
        }

        case actns.ActionTypes.ProductEditedSuccess: {
            const { product } = (action as actns.ProductEditedSuccess).payload;
            const latest = state.latestProducts.map((p) => {
                if (p._id === product._id) {
                    p = {...p, ...product};
                }
                return p;
            });
            return adapter.upsertOne(product, {...state, latestProducts: latest});
        }

        case actns.ActionTypes.ProductEditedFailed: {
            const { error } = (action as actns.ProductEditedFailed).payload;
            return { ...state };
        }

        case actns.ActionTypes.ProductDeletedSuccess: {
            const { id } = (action as actns.ProductDeletedSuccess).payload;
            const latestProds = state.latestProducts.filter(e => e._id !== id);
            return adapter.removeOne(id, {...state, latestProducts: latestProds});
        }

        case actns.ActionTypes.ProductDeletedFailed: {
            const { error } = (action as actns.ProductDeletedFailed).payload;
            return { ...state };
        }

    }
    return state;
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = adapter.getSelectors();

