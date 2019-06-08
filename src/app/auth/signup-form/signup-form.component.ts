import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IUserAccount } from "../interfaces/IUserAccount";

@Component({
  selector: "signup-form",
  templateUrl: "signup-form.component.html"
})
export class SignupFormComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  @Output("signUpEvent") formSubmitted: EventEmitter<
    IUserAccount
  > = new EventEmitter<IUserAccount>();
  @Output("resetFormEvent") resetForm: EventEmitter<
    IUserAccount
  > = new EventEmitter<IUserAccount>();
  @Input()
  errorMessage: string | null;
  ngOnInit() {}

  regisUser: IUserAccount = new UserAccount(0, null, null, null);

  onSubmit() {
    console.debug(
      "=== SignupFormComponent::onSubmit: ",
      JSON.stringify(this.signUpForm.value)
    );
    this.formSubmitted.emit(this.signUpForm.value);
  }
  reset() {
    this.errorMessage = null;
    this.signUpForm.reset();
    this.resetForm.emit();
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
