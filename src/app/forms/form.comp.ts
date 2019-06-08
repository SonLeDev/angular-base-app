import { Component } from "@angular/core";
import { Field } from "../models/field";

@Component({
  selector: "form-comp",
  templateUrl: "form.comp.html",
  styleUrls: ["./form.comp.css"]
})
export class FormComp {
  private selectedType = "Textfield";

  public fields: Field[] = [
    new Field(0, "First Name", "Textfield", false, false, "firstName"),
    new Field(0, "Age", "Number", false, false, "age")
  ];

  addNewField() {
    this.fields.push(new Field(0, "", this.selectedType, false, false, ""));
    alert(JSON.stringify(this.fields));
  }

  onSelectedFieldType(newSelectedType) {
    this.selectedType = newSelectedType;
  }
}
