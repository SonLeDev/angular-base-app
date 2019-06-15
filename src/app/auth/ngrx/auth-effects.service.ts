import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import * as authActions from './auth-actions';
import { tap, map, exhaustMap, catchError, takeWhile, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUserAccount } from '../interfaces/IUserAccount';
import { Router } from '@angular/router';

const USER_KEY = 'USER';

@Injectable()
export class AuthEffectsService {
	constructor(
		private authService: AuthService,
		private action$: Actions,
		private router: Router
	) { }
	
	@Effect() login = this.action$.pipe(
		ofType(authActions.LOG_IN),
		map((action: authActions.LoginAction) => action.payload),
		exhaustMap((user: IUserAccount) =>
			this.authService.logIn(user).pipe(
				map((user: IUserAccount) => {

					if (user['error']) {
						console.log('===== [auth-effects.service][AuthEffectsService] : AuthEffectsService : map : user[error] ', JSON.stringify(user));
						return new authActions.LogInFailureAction(user.errorMessages);
					}
					console.log('===== [auth-effects.service][AuthEffectsService] : AuthEffectsService : map : user ', JSON.stringify(user));
					return new authActions.LogInSuccessAction(user);
				}),
				takeWhile((action: authActions.LogInSuccessAction) => {
					console.log('===== [auth-effects.service][AuthEffectsService] : AuthEffectsService : takeWhile : action ', JSON.stringify(action));
					return !action.payload.error;
				}),
				tap((action: authActions.LogInSuccessAction) => {
					console.log('===== [auth-effects.service][AuthEffectsService] : AuthEffectsService : tap : action ', JSON.stringify(action));
					localStorage.setItem(
						USER_KEY,
						JSON.stringify({
							username: action.payload.username,
							token: action.payload.token,
							songCollection: action.payload.songCollection
						})
					);
				}),
				catchError(error => of(() => {
					console.log('===== [auth-effects.service][AuthEffectsService] : AuthEffectsService : catchError : error ', JSON.stringify(error));
					return new authActions.LogInFailureAction(error)
				}))
			)
		)
	);

	@Effect({ dispatch: false }) loginSuccess = this.action$.pipe(

		ofType(authActions.LOGIN_SUCCESS),
		tap(() => this.router.navigate(['/dashboard']))
	);

	@Effect()
	signup_user = this.action$.pipe(
		ofType(authActions.SIGNUP_USER),
		map((action: authActions.SignupUserAction) => action.payload),
		switchMap((state: any) =>
			this.authService.signupUser(state).pipe(
				map((user: any) => {
					if (user['error'])
						return new authActions.SignupUserInvalidAction(user.errorMessages);
					return new authActions.SignupUserValidAction(user);
				}),
				takeWhile((action: authActions.SignupUserValidAction) => {
					return !action.payload.error;
				}),
				catchError(error => {
					return of(new authActions.SignupUserInvalidAction(error));
				})
			)
		)
	);

	@Effect()
	signup = this.action$.pipe(
		ofType(authActions.SIGNUP),
		map((action: authActions.SignupAction) => action.payload),
		exhaustMap((state: IUserAccount) =>
			this.authService.signup(state).pipe(
				map((user: IUserAccount) => {
					if (user['error'])
						return new authActions.SignupFailuresAction(user.errorMessages);
					return new authActions.SignupSuccessAction(user);
				}),
				takeWhile((action: authActions.SignupSuccessAction) => {
					return !action.payload.error;
				}),
				tap((action: authActions.SignupSuccessAction) => {
					localStorage.setItem(
						USER_KEY,
						JSON.stringify({
							username: action.payload.username,
							token: action.payload.token
						})
					);
				}),
				catchError(error => {
					return of(new authActions.SignupFailuresAction(error));
				})
			)
		)
	);

	@Effect({ dispatch: false }) signupSuccess = this.action$.pipe(

		ofType(authActions.SIGNUP_SUCCESS),
		tap(() => this.router.navigate(['/login']))
	);

	@Effect({ dispatch: false }) loginRedirect = this.action$.pipe(

		ofType(authActions.LOGIN_REDIRECT),
		tap((res: authActions.LogInRedirecteAction) => {
			this.router.navigate(['/']);
		})
	);

	@Effect({ dispatch: false }) logout = this.action$.pipe(

		ofType(authActions.LOG_OUT),
		tap(() => {
			localStorage.removeItem(USER_KEY);
		}),
		tap(() => {
			this.router.navigate(['/signin']);
		})
	);


}
