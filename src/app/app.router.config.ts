import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { LoginComponent } from "./auth/components/login.component";
import { SignupComponent } from "./auth/components/signup.component";

import { AuthGuard } from "./auth/services/auth-guard.service";

import { ProductListComp } from "./product/list.comp";
import { ProductDetailComp } from "./product/detail.comp";
import { DashBoardComp } from "./dashboard/dash.comp";
const routes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "dashboard",
    component: DashBoardComp,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { path: "products", component: ProductListComp },
  { path: "product/:id", component: ProductDetailComp },

  { path: "", redirectTo: "/signin", pathMatch: "full" }
];
export const rootRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
