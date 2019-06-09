import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { Store } from "@ngrx/store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppEffectsService } from "./root-redux/app-effects.service";
import { reducers } from "./root-redux/reducers";
import { metaReducers } from "./root-redux/meta-reducer";

import { rootRoutes } from "./app.router.config";

import { AuthModule } from "./auth/auth.module";

import { SideBarNavComp } from "./layouts/sidebar.nav.comp";
import { MenuTopNavComp } from "./layouts/menutop.nav.comp";

import { ProductListComp } from "./product/list.comp";
import { ProductDetailComp } from "./product/detail.comp";
import { DashBoardComp } from "./dashboard/dash.comp";

import { AppRootComp } from "./app.root.comp";

import { FormComp } from "./forms/form.comp";
import { FieldComp } from "./fields/field.comp";
import { SelectFieldType } from "./fields/commons/select.field.type";
//where to regis/config to angular app
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffectsService]),
    rootRoutes,
    AuthModule.forRoot()
  ],
  declarations: [
    AppRootComp,
    SideBarNavComp,
    MenuTopNavComp,
    DashBoardComp,
    ProductListComp,
    ProductDetailComp,
    FormComp,
    FieldComp,
    SelectFieldType
  ],

  providers: [],
  bootstrap: [AppRootComp]
})
export class MainConfigApp {
  constructor(private store: Store<any>) {
    store.select(s => s).subscribe(console.log.bind(console));
  }
}
