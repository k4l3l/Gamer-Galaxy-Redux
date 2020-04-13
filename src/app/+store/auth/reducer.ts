import { ActionTypes, Actions, LoginSuccess, LoginFailed, LogoutSuccess, AuthCheckSuccess, AuthCheckFailed } from './actions';


export interface IState {
    username: string;
    errorMessage: string;
    isAdmin: boolean;
    roles: string[];
}

const initialState: IState = {
    username: null,
    errorMessage: null,
    isAdmin: null,
    roles: [],
};

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {

        case ActionTypes.LoginSuccess: {
            const { username, roles } = (action as LoginSuccess).payload;
            const isAdmin = roles.indexOf('Admin') > -1;
            return { ...state, username, roles, isAdmin };
        }

        case ActionTypes.LoginFailed: {
            const { error } = (action as LoginFailed).payload;
            return { ...state, errorMessage: error.message };
        }

        case ActionTypes.LogoutSuccess: {
            const { message } = (action as LogoutSuccess).payload;
            return { ...initialState, username: undefined, errorMessage: message };
        }

        case ActionTypes.AuthCheckSuccess: {
            const { username, isAdmin } = (action as AuthCheckSuccess).payload;
            return { ...state, username, isAdmin };
        }

        case ActionTypes.AuthCheckFailed: {
            const { error } = (action as AuthCheckFailed).payload;
            return { ...state, errorMessage: error.message };
        }

    }
    return state;
}
