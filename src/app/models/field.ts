export class Field {
  id: number;
  formId: number;
  fieldLabel: string;
  fieldType: string;
  unique: boolean;
  required: boolean;
  hintText: string;
  placeHolder: string;
  defaultValue: string;
  resourceName: string;
  constructor(
    id: number,
    fieldLabel: string,
    fieldType: string,
    unique: boolean,
    required: boolean,
    resourceName: string
  ) {
    this.id = id;
    this.fieldLabel = fieldLabel;
    this.fieldType = fieldType;
    this.unique = unique;
    this.required = required;
  }
}
