import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IUser, ISignupUser } from "./../../models/user";
import * as Auth from "../ngrx/auth-actions";
import * as fromAuth from "../ngrx";
import { map } from "rxjs/operators";
import { IUserAccount } from "../interfaces/IUserAccount";

const USER_KEY = "USER";

@Injectable()
export class AuthService {
  public get username() {
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    if (user && user.username && new Date(user.token) > new Date()) {
      return user.username;
    }
    return null;
  }

  constructor(private http: Http, private store: Store<fromAuth.State>) {
    let user = JSON.parse(localStorage.getItem(USER_KEY));
    console.log("USER ", user);

    if (user && user.username && new Date(user.token) > new Date()) {
      this.store.dispatch(new Auth.LogInSuccessAction(user));
    }
  }

  logIn({ username, password }: IUserAccount): Observable<IUserAccount> {
    return this.http
      .post("/api/authenticate/login", { username, password })
      .pipe(map(res => res.json()));
  }

  signup({ username, password }: IUserAccount): Observable<IUserAccount> {
    return this.http
      .post("/api/authenticate/signup", { username, password })
      .pipe(map(res => res.json()));
  }

  signupUser(
    username: string
  ): Observable<{ error: boolean; errorMessage: string }> {
    return this.http
      .post("/api/authenticate/signup/user", { username })
      .pipe(map(res => res.json()));
  }
}
