import { Component, Inject } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.root.comp.html",
  styleUrls: ["./app.root.comp.css"]
})
export class AppRootComp {
  title = "SonLeApp";
  isLogin = false;

  constructor(private store: Store<any>) {
      store.select(s => s).forEach(e=>{
         this.isLogin = e.authState.authReducers.loggedIn;
      })
  }
}
