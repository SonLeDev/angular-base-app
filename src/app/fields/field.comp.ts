import { Component } from "@angular/core";
import { Field } from "../models/field";

@Component({
  selector: "field-comp",
  templateUrl: "field.comp.html",
  styleUrls: ["./field.comp.css"]
})
export class FieldComp {
  // should manage Fieldlabel is unique

  // TODO : mapping fields outside
  public fields: Field[] = [
    new Field(0, "First Name", "Textfield", false, false, "firstName"),
    new Field(0, "Age", "Number", false, false, "age")
  ];

  private fieldObject = { firstName: {}, age: {} };

  onSelectedType(newSelectedType: string, field: Field) {
    field.fieldType = newSelectedType;
    console.log("=== FieldComp:newSelectedType : ", newSelectedType);
    console.log("=== FieldComp:field : ", JSON.stringify(field));
  }

  convert2ResourceName(label: string) {
    let retVal = "";
    // lowercase first char
    retVal = label;
    // replace all space
    return retVal;
  }
  onCheckRequired(event, field: Field) {
    event.preventDefault();
    console.log("=== FieldComp:field.required : ", field.required);
    console.log("=== FieldComp:field : ", JSON.stringify(field));
  }
}
