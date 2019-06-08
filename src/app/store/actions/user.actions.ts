import { Action } from "@ngrx/store";
import { IUser } from "../../interfaces/user.interface";
/*
  action define all activities of object : GET, SET/POST, UPDATE/PUT, DEL, LIST, DETAIL, ...
*/
export enum EUserActions {
  GetUsers = "[User] Get Users",
  GetUsersSuccess = "[User] Get Users Success",
  GetUser = "[User] Get User",
  GetUserSuccess = "[user] Get User Success"
}
export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

// type checking
export type UserActions = GetUsers | GetUsersSuccess | GetUser | GetUserSuccess;
