import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IForm } from "../../../interfaces/IForm";
import { FormBuilder } from "../../../models/FormBuilder";

@Component({
  selector: "app-formbuilder-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListFormBuilderComponent implements OnInit {
  @Input() forms: Array<IForm> = [];
  @Output("onFormSelected") onFormSelected: EventEmitter<
    IForm
  > = new EventEmitter<IForm>();

  formSelected: IForm;
  constructor() {}

  onRowClicked(evtForm) {
    this.formSelected = evtForm;
    this.onFormSelected.emit(evtForm);
  }
  ngOnInit() {}
}
