import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IUserAccount } from "../interfaces/IUserAccount";
@Component({
  selector: "login-form",
  templateUrl: "login-form.component.html"
})
export class LoginFormComponent implements OnInit {
  @Input() errorMessage: string | null;
  @Output("loginEvent")
  formSubmitted: EventEmitter<IUserAccount> = new EventEmitter<IUserAccount>();

  signInForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit() {}

  userAccount: IUserAccount = new UserAccount(0, "", "", "");

  onSubmit() {
    console.debug(
      "=== [LoginFormComponent]::onSubmit: ",
      this.signInForm.value
    );
    // emit outside to container
    this.formSubmitted.emit(this.signInForm.value);
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
