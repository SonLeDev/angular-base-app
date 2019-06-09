import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthEffectsService } from "./ngrx/auth-effects.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";

import { LoginComponent } from "./components/login.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SignupComponent } from "./components/signup.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";

import { AuthStateComponent } from "./auth-state/auth-state.component";
import {
  CheckPropertyDirective,
  ErrorTypeDirective
} from "./directives/check-property.directive";
import { UserAvailableDirective } from "./directives/user-available.directive";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./ngrx";
import { fakeBackendProvider } from "./services/fake-backend";
import { MockBackend } from "@angular/http/testing";
import { BaseRequestOptions } from "@angular/http";

export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        AuthService,
        AuthGuard,
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
      ]
    };
  }
}

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EffectsModule.forFeature([AuthEffectsService]),
    StoreModule.forFeature("authState", reducers)
  ],
  exports: [AuthStateComponent],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    SignupComponent,
    SignupFormComponent,
    AuthStateComponent
  ]
})
export class RootAuthModule {}
