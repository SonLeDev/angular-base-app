import { ActionReducerMap } from "@ngrx/store";
import * as app from "./app-reducers";

export interface State {
  appState: app.State;
}

export const reducers: ActionReducerMap<State> = {
  appState: app.reducers
};
