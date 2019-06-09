export const REDIRECT_TO = "[APP] REDIRECT TO";

export class RedirectToAction {
  readonly type = REDIRECT_TO;
  constructor(public payload: string = "/dashboard") {}
}

export type APP_ACTIONS = RedirectToAction | RedirectToAction;
