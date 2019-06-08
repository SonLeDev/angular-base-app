import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IUserAccount } from "../interfaces/IUserAccount";
@Component({
  selector: "login-form",
  templateUrl: "login-form.component.html"
})
export class LoginFormComponent implements OnInit {
  ngOnInit() {}

  userAccount = new UserAccount(0, "", "", "");

  onSubmit() {}
}

export class UserAccount implements IUserAccount {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public token: string
  ) {}
}
