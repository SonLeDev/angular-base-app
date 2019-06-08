import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { IConfig } from "../../interfaces/config.interface";
// import { ConfigService } from "../../services/config.service";
import {
  EConfigActions,
  GetConfig,
  GetConfigSuccess
} from "../actions/config.actions";

@Injectable()
export class ConfigEffects {
  constructor(private _configSerevice: any, private _actions$: Actions) {}

  @Effect()
  getConfig$ = this._actions$.pipe(
    ofType<GetConfig>(EConfigActions.GetConfig),
    switchMap(() => this._configSerevice.getConfig()),
    switchMap((config: IConfig) => {
      return of(new GetConfigSuccess(config));
    })
  );
}
