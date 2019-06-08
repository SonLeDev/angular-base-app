import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "select-field-type",
  templateUrl: "select.field.type.html"
})
export class SelectFieldType {
  @Output() onSelectedType = new EventEmitter<string>();
  @Input()
  set selectedType(selectedType) {
    this.selected = selectedType;
    if (selectedType && typeof selectedType !== "number") {
      this.dataTypes.forEach(type => {
        if (type.value === selectedType) {
          this.selected = type.key;
          return;
        }
      });
    }
  }

  get selectedType(): number {
    return this.selected;
  }

  dataTypes = [
    { key: 1, value: "Textfield" },
    { key: 2, value: "Number" },
    { key: 3, value: "Datetime" }
  ];

  dataOptions = { 1: "Textfield", 2: "Number", 3: "Datetime" };

  private selected: number = 1;

  onChange(newSelected: number) {
    console.log("=== SelectFieldType:onChange: ", newSelected);
    this.onSelectedType.emit(this.dataOptions[newSelected]);
  }
}
