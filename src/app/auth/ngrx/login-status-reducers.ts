import * as authActions from "./auth-actions";

export interface State {
	pending: boolean;
	error: string | null;
}

const initialState: State = {
	pending: false,
	error: null
}

export function reducers(state: State = initialState, action: authActions.AUTH): State {
	console.log('===== [login-status-reducers][reducers]');
	switch (action.type) {
		case authActions.LOG_IN:
			console.log('===== [login-status-reducers][reducers] LOG_IN ', JSON.stringify({ ...state, pending: true, error: null }));
			return { ...state, pending: true, error: null };
		case authActions.LOGIN_FAILURE:
			console.log('===== [login-status-reducers][reducers] LOGIN_FAILURE ', JSON.stringify({ ...state, pending: false, error: action.payload }));
			return { ...state, pending: false, error: action.payload };
		case authActions.LOGIN_REDIRECT:
			console.log('===== [login-status-reducers][reducers] LOGIN_REDIRECT ', JSON.stringify({ ...state, pending: false, error: action.payload }));
			return { ...state, pending: false, error: action.payload };
		default:
			console.log('===== [login-status-reducers][reducers] default initialState ', JSON.stringify(initialState));
			return initialState;
	}
}

export const getLoginPending = (state: State) => state.pending;
export const getLoginError = (state: State) => state.error;
