import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "dash-board",
  templateUrl: "dash.comp.html"
})
export class DashBoardComp {
  constructor(public router: Router) {}
}
