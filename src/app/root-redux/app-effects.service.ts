import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as appActions from "./app-actions";
import { Router } from "@angular/router";

@Injectable()
export class AppEffectsService {
  @Effect({ dispatch: false })
  redirectTo = this.action$.pipe(
    ofType(appActions.REDIRECT_TO),
    tap((action: appActions.RedirectToAction) => {
      this.router.navigate([action.payload]);
    })
  );
  constructor(private action$: Actions, private router: Router) {}
}
