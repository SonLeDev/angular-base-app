import { Component, Inject } from "@angular/core";
import { AuthGuard } from "./auth/services/auth-guard.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.root.comp.html",
  styleUrls: ["./app.root.comp.css"]
})
export class AppRootComp {
  title = "SonLeApp";
  isLogin = false;

  constructor(@Inject(AuthGuard) private authGuard) {
    if (this.authGuard.canActivate().hasOwnProperty("operator")) {
      this.isLogin = this.authGuard.canActivate().operator.total;
    }
  }
}
