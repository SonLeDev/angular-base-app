import { ActionReducerMap } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { IAppState } from "../state/app.state";
import { configReducers } from "./config.reducers";
import { userReducers } from "./user.reducers";

/*
  Here is my answer : 
  should have a global reducer that hold all the states for each of object
  

*/
export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  users: userReducers,
  config: configReducers
};
