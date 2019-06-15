import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRequestOptions } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { FormbuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormsModule } from '@angular/forms';
import { ListFormBuilderComponent } from './components/formbuilder/list/list.component';
import { DetailFormbuilderComponent } from './components/formbuilder/detail/detail.component';

export class FormBaseModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: RootFormBase,
			providers: []
		};
	}
}

@NgModule({
	declarations: [FormbuilderComponent, ListFormBuilderComponent, DetailFormbuilderComponent],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [FormbuilderComponent,ListFormBuilderComponent,DetailFormbuilderComponent],
})
export class RootFormBase { }
