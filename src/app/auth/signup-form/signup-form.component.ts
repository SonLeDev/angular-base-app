import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IUser } from "../../models/user";
import { ErrorMatcher } from "./../validators/error.validator";

@Component({
  selector: "signup-form",
  templateUrl: "signup-form.component.html"
})
export class SignupFormComponent implements OnInit {
  ngOnInit() {}

  powers = ["Really Smart", "Super Flexible", "Super Hot", "Weather Changer"];

  model = new Hero(18, "Dr IQ", this.powers[0], "Chuck Overstreet");

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, "", "");
  }
}

export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {}
}
