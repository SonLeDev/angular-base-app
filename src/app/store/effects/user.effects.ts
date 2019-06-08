import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { IAppState } from "../state/app.state";

import {
  EUserActions,
  GetUser,
  GetUserSuccess,
  GetUsers,
  GetUsersSuccess
} from "../actions/user.actions";
// import { selectUserList } from "../selectors/user.selector";
// import { UserService } from "../../services/user.service";
// import { IUserHttp } from "../../models/http-models/user-http.interface";

@Injectable()
export class UserEffects {
  constructor(
    private _userService: any,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}

  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.filter(user => user.id === +id)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  );
}
