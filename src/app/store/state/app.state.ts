import { RouterReducerState } from "@ngrx/router-store";

import { IUserState, initialUserState } from "./user.state";
import { IConfigState, initalConfigState } from "./config.state";

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  config: IConfigState;
}

export const initialAppState: IAppStatee = {
  users: initialUserState,
  config: initialConfigState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
