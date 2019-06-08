import { EUserActions } from "./../actions/user.actions";
import { UserActions } from "../actions/user.actions";
import { initialUserState, IUserState } from "../state/user.state";

/*
  state = initialUserState, its type is IUserState -> satisfy the strict of interface
  so, where feed data for payload, 
  and after reducer, the return data for what ?

  => reducer return the state of any type object
  => should have a global state that hold all states like this
*/
export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    default:
      return state;
  }
};
