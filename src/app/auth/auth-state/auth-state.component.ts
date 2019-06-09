import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { IUserAccount } from "../interfaces/IUserAccount";
@Component({
  selector: "auth-state",
  templateUrl: "auth-state.component.html"
})
export class AuthStateComponent {
  @Output("logout") logoutEvent: EventEmitter<IUserAccount> = new EventEmitter<
    IUserAccount
  >();

  @Input("authState")
  currentAuthState: { loggedIn: boolean; currentUser: IUserAccount } | null;

  logout() {
    this.logoutEvent.emit();
  }
}
