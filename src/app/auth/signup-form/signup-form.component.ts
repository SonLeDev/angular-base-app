import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IUser } from "../../models/user";
import { IUserAccount } from "../interfaces/IUserAccount";
import { ErrorMatcher } from "./../validators/error.validator";

@Component({
  selector: "signup-form",
  templateUrl: "signup-form.component.html"
})
export class SignupFormComponent implements OnInit {
  ngOnInit() {}

  powers = ["Really Smart", "Super Flexible", "Super Hot", "Weather Changer"];

  userAccount = new UserAccount(0, "", "", "");

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, "", "");
  }
}

export class UserAccount implements IUserAccount {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public token: string
  ) {}
}
