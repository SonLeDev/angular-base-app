import { IForm } from "../interfaces/IForm";

export class FormBuilder implements IForm {
	label: string;
	id: number;
	icon: string;
	resourceName: string;
	constructor(  label: string ) {
		this.label = label;
	}
}