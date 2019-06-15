import { Component, OnInit, Input } from '@angular/core';
import { IForm } from 'src/app/form-base/interfaces/IForm';
import { FormBuilder } from 'src/app/form-base/models/FormBuilder';

@Component({
	selector: 'app-formbuilder-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})
export class DetailFormbuilderComponent implements OnInit {

	readForm: IForm;
	editForm: IForm;
	private readOnly: boolean = true;

	@Input() set form(value: IForm) {

		this.readForm = Object.assign({}, value);
		this.editForm = Object.assign({}, value);
	}

	constructor() {
		this.readOnly = true;
		console.log("[DetailFormbuilderComponent::constructor] : form : ");

	}

	onSaveState() {

	}

	onEditState() {
		this.readOnly = false;
	}
	onCancelState() {
		this.readOnly = true;
		//restore original form if cancel
		this.editForm = Object.assign({}, this.readForm);
	}

	canEdit() {
		let retVal = false;
		if (!this.readOnly && this.readForm && this.editForm) {
			retVal = true;
		}
		return retVal;
	}



	ngOnInit() {
	}

}
